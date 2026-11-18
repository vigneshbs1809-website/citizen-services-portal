import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Language codes to SpeechRecognition BCP-47 locale tags
export const RECOGNITION_LOCALE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  ml: 'ml-IN',
};

// Check if browser supports SpeechRecognition
export function isSpeechRecognitionSupported() {
  return (
    typeof window !== 'undefined' &&
    Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
}

/**
 * Custom hook managing voice speech recognition
 * @param {Object} options
 * @param {string} options.lang - active interface language code ('en', 'kn', 'hi', 'te', 'ta', 'ml')
 * @param {Function} options.onTranscriptChange - callback when speech recognition produces text
 * @param {Function} options.onFinalResult - callback when speech ends with final text
 */
export function useVoiceSearch({
  lang = 'en',
  onTranscriptChange,
  onFinalResult,
} = {}) {
  const { t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const recognitionRef = useRef(null);
  const isSupported = isSpeechRecognitionSupported();

  // Target locale for the recognition engine
  const targetLocale = RECOGNITION_LOCALE_MAP[lang.slice(0, 2).toLowerCase()] || 'en-IN';

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
    };
  }, []);

  const clearError = useCallback(() => {
    setErrorCode(null);
    setErrorMessage(null);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    clearError();

    // 1. Browser compatibility check
    if (!isSupported) {
      setErrorCode('browser-unsupported');
      setErrorMessage(
        t(
          'search.voiceNotSupported',
          'Voice recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.'
        )
      );
      return;
    }

    // 2. Stop any existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
    }

    try {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = targetLocale;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      setTranscript('');
      setInterimTranscript('');

      recognition.onstart = () => {
        setIsListening(true);
        clearError();
      };

      recognition.onresult = (event) => {
        let finalStr = '';
        let interimStr = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          const text = result[0]?.transcript || '';

          if (result.isFinal) {
            finalStr += text;
          } else {
            interimStr += text;
          }
        }

        const combined = (finalStr || interimStr).trim();
        setTranscript(finalStr);
        setInterimTranscript(interimStr);

        if (onTranscriptChange && combined) {
          onTranscriptChange(combined);
        }

        if (finalStr && onFinalResult) {
          onFinalResult(finalStr.trim());
        }
      };

      recognition.onerror = (event) => {
        const error = event.error;
        setErrorCode(error);
        setIsListening(false);

        switch (error) {
          case 'not-allowed':
          case 'service-not-allowed':
            setErrorMessage(
              t(
                'search.voicePermissionDenied',
                'Microphone access was denied. Please allow microphone permission in your browser address bar to speak.'
              )
            );
            break;
          case 'no-speech':
            setErrorMessage(
              t(
                'search.voiceNoSpeech',
                'No speech was detected. Please tap the microphone and speak again.'
              )
            );
            break;
          case 'audio-capture':
            setErrorMessage(
              t(
                'search.voiceAudioCapture',
                'No microphone was found on your device. Please ensure a microphone is connected.'
              )
            );
            break;
          case 'network':
            setErrorMessage(
              t(
                'search.voiceNetworkError',
                'Network error during voice recognition. Please check your internet connection.'
              )
            );
            break;
          case 'language-not-supported':
            setErrorMessage(
              t(
                'search.voiceLangNotSupported',
                'Voice recognition is not supported by your browser in this language. Please type your query.'
              )
            );
            break;
          default:
            setErrorMessage(
              t(
                'search.voiceGenericError',
                'Voice recognition encountered an issue. Please try again or type below.'
              )
            );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('SpeechRecognition start failed:', err);
      setIsListening(false);
      setErrorCode('init-failed');
      setErrorMessage(
        t(
          'search.voicePermissionDenied',
          'Could not start voice recognition. Please check browser microphone permissions.'
        )
      );
    }
  }, [isSupported, targetLocale, t, onTranscriptChange, onFinalResult, clearError]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, stopListening, startListening]);

  return {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    errorCode,
    errorMessage,
    targetLocale,
    startListening,
    stopListening,
    toggleListening,
    clearError,
  };
}

export default useVoiceSearch;
