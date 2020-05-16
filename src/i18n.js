import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/enTranslations';
import ru from './locales/ru/ruTranslations';

const lng = 'en';

i18next
  .use(initReactI18next)
  .init({
    lng,
    fallbackLng: 'en',
    resources: {
      en,
      ru,
    },
  });

export default i18next;
