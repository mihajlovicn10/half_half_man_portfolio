import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language resources
import en from './locales/en/translation.js';
import it from './locales/it/translation.js';
import es from './locales/es/translation.js';
import de from './locales/de/translation.js';
import fr from './locales/fr/translation.js';
import el from './locales/el/translation.js';
import sr from './locales/sr/translation.js';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // Force English as default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    supportedLngs: ['en', 'it', 'es', 'de', 'fr', 'el', 'sr'],
    
    resources: {
      en,
      it,
      es,
      de,
      fr, 
      el, 
      sr, 
    },

    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default'
    }
  });

// Handle language change
i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = i18n.dir(lng);
});

export default i18n; 