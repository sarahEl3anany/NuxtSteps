// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
        '@primevue/nuxt-module',
        '@nuxtjs/tailwindcss',
        '@vee-validate/nuxt'
      ],
      primevue: {
        options: {
          theme: {
            preset: Aura
          }
        }
      }
})
