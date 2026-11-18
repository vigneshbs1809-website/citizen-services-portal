import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import kn from './locales/kn.json';
import hi from './locales/hi.json';
import te from './locales/te.json';
import ta from './locales/ta.json';
import ml from './locales/ml.json';

const resources = {
  en: { translation: en },
  kn: { translation: kn },
  hi: { translation: hi },
  te: { translation: te },
  ta: { translation: ta },
  ml: { translation: ml },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'kn', 'hi', 'te', 'ta', 'ml'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    react: {
      useSuspense: false,
    },
  });

// Bind document.documentElement.lang dynamically whenever language switches
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    const code = lng ? lng.slice(0, 2) : 'en';
    document.documentElement.lang = code;
  }
});

// Initial trigger to ensure correct HTML lang tag on boot
if (typeof document !== 'undefined') {
  const currentLang = i18n.language ? i18n.language.slice(0, 2) : 'en';
  document.documentElement.lang = currentLang;
}

export default i18n;
