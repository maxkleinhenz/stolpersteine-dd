// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      MAPTILER_API_KEY: "",
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "nuxt-icon", "nuxt-swiper"],
  swiper: {
    modules: ["navigation", "mousewheel"],
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["swiper-container", "swiper-slide"].includes(tag),
    },
  },
  vite: {
    define: {
      "process.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE": "1000000",
      "process.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS": "1000000",
    },
  },
});
