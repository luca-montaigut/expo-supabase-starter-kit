import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { resources } from './resources';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: Localization.locale.split('-')[0],
  fallbackLng: 'en',
  debug: false,
  resources,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  // override if needed - omit if ok with defaults
  /*
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    }
    */
});

export default i18n;
