// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@" : resolve(__dirname, "/")
  },
  css: ["~/assets/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    'vuetify-nuxt-module', 
    'nuxt-graphql-client',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://127.0.0.1:8000/graphql' // overwritten by process.env.GQL_HOST
    }
  }
})