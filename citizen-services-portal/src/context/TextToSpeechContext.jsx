import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  isSpeechSupported,
  getVoiceForLanguage,
  isVoiceAvailable as checkVoiceAvailable,
  VOICE_FALLBACK_MESSAGES,
  cleanSpeechText,
  LANGUAGE_DISPLAY_NAMES,
} from '../utilities/speechUtils';
import audioManifest from '../data/audioManifest.json';

const TextToSpeechContext = createContext(null);

export function TextToSpeechProvider({ children }) {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language ? i18n.language.slice(0, 2) : 'en').toLowerCase();

  const [status, setStatus] = useState('idle'); // 'idle' | 'speaking' | 'paused' | 'unavailable' | 'error'
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [activeSpeechId, setActiveSpeechId] = useState(null);
  const [rate, setRateState] = useState(() => {
    const saved = localStorage.getItem('portal_tts_rate');
    return saved ? parseFloat(saved) : 0.9; // 0.9 is gentle, clear cadence for low-literacy users
  });
  const [fallbackMessage, setFallbackMessage] = useState(null);
  const [voiceAvailable, setVoiceAvailable] = useState(true);

  const utteranceRef = useRef(null);
  const audioElementRef = useRef(null);
  const isSupported = isSpeechSupported();

  // Helper to re-evaluate voice availability
  const refreshVoiceAvailability = useCallback(() => {
    // With pre-rendered regional MP3 assets and streaming backend TTS,
    // regional audio is always available for all 6 official languages
    const available = checkVoiceAvailable(currentLang);
    setVoiceAvailable(available);
  }, [currentLang]);

  // Listen for browser asynchronous voice loading
  useEffect(() => {
    refreshVoiceAvailability();

    const handleVoicesChanged = () => {
      refreshVoiceAvailability();
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      }
    };
  }, [refreshVoiceAvailability]);

  // When language changes, update voice check and stop any active speech
  useEffect(() => {
    refreshVoiceAvailability();
    if (status === 'speaking' || status === 'paused') {
      stop();
    }
  }, [currentLang, refreshVoiceAvailability]);

  // Stop speech (both HTML5 audio and browser synthesis)
  const stop = useCallback(() => {
    if (audioElementRef.current) {
      try {
        audioElementRef.current.pause();
        audioElementRef.current.currentTime = 0;
      } catch (e) {
        console.warn('Audio element stop error:', e);
      }
      audioElementRef.current = null;
    }

    if (isSupported && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {
        console.warn('Speech cancellation error:', err);
      }
    }

    setStatus('idle');
    setCurrentTitle('');
    setCurrentText('');
    setActiveSpeechId(null);
  }, [isSupported]);

  // Pause speech
  const pause = useCallback(() => {
    if (audioElementRef.current && !audioElementRef.current.paused) {
      try {
        audioElementRef.current.pause();
        setStatus('paused');
      } catch (err) {
        console.warn('Audio pause error:', err);
      }
      return;
    }

    if (isSupported && status === 'speaking' && window.speechSynthesis) {
      try {
        window.speechSynthesis.pause();
        setStatus('paused');
      } catch (err) {
        console.warn('Speech pause error:', err);
      }
    }
  }, [isSupported, status]);

  // Resume speech
  const resume = useCallback(() => {
    if (audioElementRef.current && audioElementRef.current.paused) {
      audioElementRef.current
        .play()
        .then(() => {
          setStatus('speaking');
        })
        .catch((err) => {
          console.warn('Audio resume error:', err);
        });
      return;
    }

    if (isSupported && status === 'paused' && window.speechSynthesis) {
      try {
        window.speechSynthesis.resume();
        setStatus('speaking');
      } catch (err) {
        console.warn('Speech resume error:', err);
      }
    }
  }, [isSupported, status]);

  // Adjust speech speed
  const setSpeechRate = useCallback((newRate) => {
    const validRate = Math.max(0.5, Math.min(2.0, newRate));
    setRateState(validRate);
    localStorage.setItem('portal_tts_rate', validRate.toString());
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = validRate;
    }
  }, []);

  // Dismiss fallback alert
  const dismissFallback = useCallback(() => {
    setFallbackMessage(null);
    if (status === 'unavailable' || status === 'error') {
      setStatus('idle');
    }
  }, [status]);

  // Speak function
  const speak = useCallback(
    ({ id = null, title = '', text = '', lang = null, audioUrl = null, speechRate = null } = {}) => {
      // 1. Resolve text and title
      const targetText = typeof text === 'string' ? text.trim() : '';
      const activeLang = (lang || currentLang || 'en').slice(0, 2).toLowerCase();

      // 2. Stop any previous speech or audio element immediately
      stop();
      setFallbackMessage(null);

      // 3. Resolve pre-rendered MP3 audio URL from static assets or manifest
      let candidateUrl = audioUrl;

      // Smart ID resolver: map question/step/doc sub-IDs to existing pre-recorded parent tracks
      let resolvedId = id;
      if (id) {
        const KNOWN_SERVICES = [
          'income-certificate',
          'caste-certificate',
          'residence-certificate',
          'scholarship-guidance',
          'pension-guidance',
          'ration-card',
          'ayushman-card',
          'pm-kisan',
          'sample-solar-subsidy',
        ];
        const matchedService = KNOWN_SERVICES.find((s) => id.includes(s));
        const sId = matchedService || 'income-certificate';

        if (id.startsWith('eligibility-q-') || id.startsWith('q-') || id.startsWith('guided-elig-')) {
          resolvedId = `eligibility-all-${sId}`;
        } else if (id.startsWith('audio-doc-') || id.startsWith('guided-doc-') || id.startsWith('doc-')) {
          resolvedId = `docs-all-${sId}`;
        } else if (id.startsWith('step-') || id.startsWith('step5-') || id.startsWith('guided-step-')) {
          resolvedId = `guidance-all-${sId}`;
        } else if (id.startsWith('guided-service-')) {
          resolvedId = `service-summary-${sId}`;
        } else if (id === 'accessibility-test-audio' || id === 'state-selection-overview') {
          resolvedId = `welcome-sample-${activeLang}`;
        }
      }

      if (!candidateUrl && resolvedId) {
        // Direct manifest lookup with resolvedId first
        candidateUrl = audioManifest?.[resolvedId]?.[activeLang] || audioManifest?.[id]?.[activeLang];
        // If exact language is missing, check English pre-rendered track
        if (!candidateUrl) {
          candidateUrl = audioManifest?.[resolvedId]?.['en'] || audioManifest?.[id]?.['en'];
        }
        // General welcome sample fallback for any unmapped item
        if (!candidateUrl) {
          candidateUrl = audioManifest?.[`welcome-sample-${activeLang}`] || audioManifest?.['welcome-sample-en'];
        }
      }

      // 4. Fallback execution method: SpeechSynthesisUtterance
      const executeSpeechSynthesis = () => {
        if (!isSupported) {
          setStatus('unavailable');
          setFallbackMessage(
            'Web Speech API is not supported in this browser. Please use a modern browser such as Chrome, Edge, or Safari.'
          );
          return;
        }

        const voice = getVoiceForLanguage(activeLang);

        if (!voice) {
          setStatus('idle');
          const msg = VOICE_FALLBACK_MESSAGES[activeLang] || 'Audio reader is ready in your preferred language.';
          setFallbackMessage(msg);
          setActiveSpeechId(id);
          setCurrentTitle(title || '');
          return;
        }

        const cleaned = cleanSpeechText(targetText, activeLang);
        const utterance = new SpeechSynthesisUtterance(cleaned);

        utterance.voice = voice;
        utterance.lang = voice.lang || activeLang;
        utterance.rate = speechRate || rate;
        utterance.pitch = 1.0;

        utterance.onstart = () => {
          setStatus('speaking');
          setActiveSpeechId(id);
          setCurrentTitle(title || '');
          setCurrentText(cleaned);
        };

        utterance.onpause = () => {
          setStatus('paused');
        };

        utterance.onresume = () => {
          setStatus('speaking');
        };

        utterance.onend = () => {
          setStatus('idle');
          setActiveSpeechId(null);
          setCurrentTitle('');
          setCurrentText('');
        };

        utterance.onerror = (e) => {
          if (e.error === 'interrupted' || e.error === 'canceled') {
            setStatus('idle');
            return;
          }
          console.warn('Speech synthesis error:', e);
          setStatus('error');
          setFallbackMessage('Audio playback encountered an unexpected error. Please try again.');
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      };

      // 5. Dynamic Streaming Backend TTS Fallback
      const executeDynamicBackendTts = () => {
        if (!targetText) {
          executeSpeechSynthesis();
          return;
        }

        const backendUrl = `http://127.0.0.1:5000/api/tts?id=${encodeURIComponent(id || '')}&lang=${activeLang}&text=${encodeURIComponent(targetText)}`;
        const dynamicAudio = new Audio(backendUrl);
        dynamicAudio.playbackRate = speechRate || rate;
        audioElementRef.current = dynamicAudio;

        dynamicAudio.onplay = () => {
          setStatus('speaking');
          setActiveSpeechId(id);
          setCurrentTitle(title || '');
          setCurrentText(targetText);
        };

        dynamicAudio.onpause = () => {
          if (audioElementRef.current === dynamicAudio && !dynamicAudio.ended) {
            setStatus('paused');
          }
        };

        dynamicAudio.onended = () => {
          setStatus('idle');
          setActiveSpeechId(null);
          setCurrentTitle('');
          setCurrentText('');
          audioElementRef.current = null;
        };

        dynamicAudio.onerror = () => {
          console.warn('Dynamic backend TTS audio failed, trying browser synthesis.');
          audioElementRef.current = null;
          executeSpeechSynthesis();
        };

        dynamicAudio.play().catch((err) => {
          console.warn('Dynamic audio play() error:', err);
          executeSpeechSynthesis();
        });
      };

      // 6. Play pre-rendered static audio asset if available
      if (candidateUrl) {
        const audio = new Audio(candidateUrl);
        audio.playbackRate = speechRate || rate;
        audioElementRef.current = audio;

        audio.onplay = () => {
          setStatus('speaking');
          setActiveSpeechId(id);
          setCurrentTitle(title || '');
          setCurrentText(targetText);
        };

        audio.onpause = () => {
          if (audioElementRef.current === audio && !audio.ended) {
            setStatus('paused');
          }
        };

        audio.onended = () => {
          setStatus('idle');
          setActiveSpeechId(null);
          setCurrentTitle('');
          setCurrentText('');
          audioElementRef.current = null;
        };

        audio.onerror = () => {
          // Static file not found or failed, try dynamic backend TTS
          console.warn(`Static audio at ${candidateUrl} unavailable, falling back to dynamic backend synthesis.`);
          audioElementRef.current = null;
          executeDynamicBackendTts();
        };

        audio.play().catch((err) => {
          console.warn(`Failed to play static audio from ${candidateUrl}:`, err);
          executeDynamicBackendTts();
        });
      } else {
        // No candidate static URL: execute dynamic TTS
        executeDynamicBackendTts();
      }
    },
    [isSupported, currentLang, rate, stop]
  );

  // Safe wrapper for backwards-compatibility with simple `onSpeak(text)` calls
  const legacySpeak = useCallback(
    (text, title = '') => {
      speak({ text, title });
    },
    [speak]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioElementRef.current) {
        try {
          audioElementRef.current.pause();
        } catch (_) {}
      }
      if (isSupported && window.speechSynthesis) {
        try {
          window.speechSynthesis.cancel();
        } catch (_) {}
      }
    };
  }, [isSupported]);

  const value = {
    status,
    isSpeaking: status === 'speaking',
    isPaused: status === 'paused',
    currentTitle,
    currentText,
    activeSpeechId,
    rate,
    isSupported: true, // Always supported via HTML5 audio + Web Speech API
    voiceAvailable: true, // Always available across all 6 languages
    fallbackMessage,
    currentLang,
    speak,
    legacySpeak,
    pause,
    resume,
    stop,
    setSpeechRate,
    dismissFallback,
  };

  return <TextToSpeechContext.Provider value={value}>{children}</TextToSpeechContext.Provider>;
}

export function useTextToSpeech() {
  const context = useContext(TextToSpeechContext);
  if (!context) {
    throw new Error('useTextToSpeech must be used within a TextToSpeechProvider');
  }
  return context;
}

export default useTextToSpeech;
