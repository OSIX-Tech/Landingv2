import i18next from 'i18next';
import Backend from 'i18next-http-backend';

export async function initI18n(lang: string) {
  await i18next.use(Backend).init({
    lng: lang,
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  });
  return i18next;
}