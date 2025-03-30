import { createI18n } from "vue-i18n";
import { ru } from 'vuetify/locale'; // Правильный импорт для Vuetify 3

// @ts-ignore
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    messages: {
      ru: {
        $vuetify: {
          ...ru,

        }
      }
    }
  });

  nuxtApp.vueApp.use(i18n);
});