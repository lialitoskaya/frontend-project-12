import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru } from './resources';

const i18n = i18next.createInstance();

export const init = async () => {
  await i18n.use(initReactI18next).init({
    resources: { ru },
    fallbackLng: 'ru',
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
