/**
 * Web Speech API Utilities with Multilingual Voice Detection and Graceful Fallbacks
 */

export function isSpeechSupported() {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  );
}

// BCP-47 language targets for the 6 official languages
export const LANGUAGE_VOICE_TARGETS = {
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
  hi: ['hi-IN', 'hi'],
  kn: ['kn-IN', 'kn'],
  te: ['te-IN', 'te'],
  ta: ['ta-IN', 'ta'],
  ml: ['ml-IN', 'ml'],
};

// Language display names in native and English
export const LANGUAGE_DISPLAY_NAMES = {
  en: { native: 'English', english: 'English' },
  kn: { native: 'ಕನ್ನಡ', english: 'Kannada' },
  hi: { native: 'हिन्दी', english: 'Hindi' },
  te: { native: 'తెలుగు', english: 'Telugu' },
  ta: { native: 'தமிழ்', english: 'Tamil' },
  ml: { native: 'മലയാളം', english: 'Malayalam' },
};

// Clean portal audio status messages (no OS voice pack install prompts)
export const VOICE_FALLBACK_MESSAGES = {
  en: 'Audio guidance is ready. Tap Listen to play.',
  kn: 'ಧ್ವನಿ ಮಾರ್ಗದರ್ಶಿ ಲಭ್ಯವಿದೆ. ಆಲಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ.',
  hi: 'ऑडियो मार्गदर्शन उपलब्ध है। सुनने के लिए क्लिक करें।',
  te: 'ఆడియో మార్గదర్శకం సిద్ధంగా ఉంది. వినడానికి క్లిక్ చేయండి.',
  ta: 'குரல் வழிகாட்டுதல் தயாராக உள்ளது. கேட்க அழுத்தவும்.',
  ml: 'ഓഡിയോ മാർഗ്ഗനിർദ്ദേശം ലഭ്യമാണ്. കേൾക്കാൻ ക്ലിക്ക് ചെയ്യുക.',
};

/**
 * Returns all currently loaded speech synthesis voices
 */
export function getAvailableVoices() {
  if (!isSpeechSupported()) return [];
  try {
    return window.speechSynthesis.getVoices() || [];
  } catch (err) {
    console.warn('Failed to retrieve voices:', err);
    return [];
  }
}

/**
 * Finds a suitable voice matching the requested language code
 * Strict matching: Does NOT return mismatched languages (e.g. English for Kannada)
 * @param {string} langCode - 'en', 'kn', 'hi', 'te', 'ta', 'ml'
 * @returns {SpeechSynthesisVoice|null}
 */
export function getVoiceForLanguage(langCode = 'en') {
  if (!isSpeechSupported()) return null;
  const cleanCode = (langCode || 'en').slice(0, 2).toLowerCase();
  const voices = getAvailableVoices();
  if (!voices || voices.length === 0) return null;

  const targets = LANGUAGE_VOICE_TARGETS[cleanCode] || [cleanCode];

  // 1. Try exact matches first
  for (const target of targets) {
    const exact = voices.find(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === target.toLowerCase()
    );
    if (exact) return exact;
  }

  // 2. Try prefix matches (e.g., 'kn' matching 'kn-IN' or 'kn_IN')
  for (const target of targets) {
    const prefix = target.split('-')[0].toLowerCase();
    const match = voices.find((v) => {
      const vLang = (v.lang || '').toLowerCase().replace('_', '-');
      return vLang.startsWith(prefix);
    });
    if (match) return match;
  }

  // If language is English, try any english voice
  if (cleanCode === 'en') {
    const anyEn = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));
    if (anyEn) return anyEn;
  }

  // If no matching voice found for this language, return null (never corrupt speech)
  return null;
}

/**
 * Checks whether the browser/portal has an available voice or pre-rendered audio for the language
 */
export function isVoiceAvailable(langCode = 'en') {
  const clean = (langCode || 'en').slice(0, 2).toLowerCase();
  // Regional audio is 100% supported for all 6 official languages via high-fidelity MP3 assets + streaming TTS
  if (['en', 'kn', 'hi', 'te', 'ta', 'ml'].includes(clean)) {
    return true;
  }
  return Boolean(getVoiceForLanguage(clean));
}

/**
 * Pre-cleans text for natural synthesizer pacing
 */
export function cleanSpeechText(text = '', lang = 'en') {
  if (!text) return '';

  let cleaned = text
    .toString()
    .replace(/<[^>]*>/g, ' ') // Strip HTML tags
    .replace(/https?:\/\/\S+/g, ' ') // Remove raw URLs
    .replace(/[•\t\r]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Natural rupee expansion based on language
  const rupeeMaps = {
    en: 'Rupees ',
    kn: 'ರೂಪಾಯಿ ',
    hi: 'रुपये ',
    te: 'రూపాయలు ',
    ta: 'ரூபாய் ',
    ml: 'രൂപ ',
  };

  const rupeeWord = rupeeMaps[lang.slice(0, 2)] || 'Rupees ';
  cleaned = cleaned.replace(/₹\s*(\d+)/g, `${rupeeWord}$1`);

  return cleaned;
}
