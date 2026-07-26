import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Default to English; returning users with a saved choice are restored from
    // localStorage by the detector below. We intentionally skip navigator/htmlTag
    // detection so a Spanish-browser visitor with no preference doesn't briefly
    // see Spanish before the user doc resolves and re-syncs to English.
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
  });

export default i18n;
