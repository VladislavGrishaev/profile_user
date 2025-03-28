// @ts-ignore
export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.scss',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  build: {
    transpile: ['vuetify']
  },

  modules: [
    '@pinia/nuxt'
  ],

  pinia: {
    storesDirs: ['./store/**'],
  },

  vite: {
    vue: {
      // @ts-ignore
      reactivityTransform: true
    },
    define: {
      'process.env.DEBUG': false
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/variables.scss" as *\n',
        }
      }
    }
  },

  compatibilityDate: '2025-03-28'
})