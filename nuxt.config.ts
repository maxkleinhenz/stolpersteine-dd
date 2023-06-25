import { StolpersteinResult } from "./models/stolperstein.model";
import stolpersteinData from "./server/api/stolpersteine/stolpersteine.json";

const getStolersteinRoutes = () => {
  const result = stolpersteinData as unknown as StolpersteinResult;
  return result.features.map((s) => `/karte/${s.properties.id}`);
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/stolpersteine-dd/",
  },
  ssr: true,
  hooks: {
    "nitro:config"(nitroConfig) {
      const slugs = getStolersteinRoutes();
      // add the routes to the nitro config
      nitroConfig.prerender?.routes?.push(...slugs);
    },
  },
  experimental: {
    payloadExtraction: true,
  },
  routeRules: {
    "/karte/**": { prerender: true },
  },
  nitro: {
    prerender: { crawlLinks: true },
  },
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
