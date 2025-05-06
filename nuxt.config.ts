// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxtjs/mdc"],

  runtimeConfig: {
    openaiApiKey: "",
  },

  mdc: {
    highlight: {
      theme: "vitesse-black",
      langs: [
        "html",
        "css",
        "javascript",
        "typescript",
        "vue",
        "json",
        "bash",
        "markdown",
      ],
    },
  },
});
