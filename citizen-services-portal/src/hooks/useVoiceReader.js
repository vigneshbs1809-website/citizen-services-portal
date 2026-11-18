import { useTextToSpeech } from '../context/TextToSpeechContext';

/**
 * Hook providing access to the centralized Text-to-Speech system
 */
export function useVoiceReader() {
  const {
    isSpeaking,
    isPaused,
    status,
    speak,
    legacySpeak,
    pause,
    resume,
    stop,
    rate,
    setSpeechRate,
    isSupported,
    voiceAvailable,
    fallbackMessage,
    currentTitle,
    activeSpeechId,
  } = useTextToSpeech();

  return {
    isSpeaking,
    isPaused,
    status,
    speak: legacySpeak, // Accepts text or (text, title)
    speakAdvanced: speak, // Accepts { id, title, text, lang, speechRate }
    pause,
    resume,
    stop,
    rate,
    setSpeechRate,
    isSupported,
    voiceAvailable,
    fallbackMessage,
    currentTitle,
    activeSpeechId,
  };
}

export default useVoiceReader;
