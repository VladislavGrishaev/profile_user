// @ts-ignore
// @ts-ignore
export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  imports: {
    autoImport: true
  },

  build: {
    transpile: ['vuetify']
  },

  modules: [
    '@pinia/nuxt'
  ],

  pinia: {
    storesDirs: ['./store/**'],
  },
  vuetify: {
    moduleOptions: {
      styles: true,
      autoImport: true,
    },
    vuetifyOptions: {
      locale: {
        locale: 'ru',
      }
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/variables.scss" as *\n',
        }
      }
    }
  },
  ssr: false,

  compatibilityDate: '2025-03-28'
})