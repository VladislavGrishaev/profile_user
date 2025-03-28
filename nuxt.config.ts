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

  vite: {
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
  }
})