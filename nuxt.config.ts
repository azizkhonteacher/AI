// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/style/main.scss"],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://redoxai-production.up.railway.app',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  },
});
