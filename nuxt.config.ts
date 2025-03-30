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
      locale: {
        locale: 'ru',

      }
    }
  },
  vite: {
    // vue: {
    //   // @ts-ignore
    //   reactivityTransform: true
    // },
    // define: {
    //   'process.env.DEBUG': false
    // },
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