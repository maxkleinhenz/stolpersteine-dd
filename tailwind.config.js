/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      minHeight: {
        screen: ["100vh", "100svh"],
      },
      colors: {
        stolperstein: "rgb(var(--app-stolperstein-color) / <alpha-value>)",
        base: {
          1: "rgb(var(--base-1-color) / <alpha-value>)",
          2: "rgb(var(--base-2-color) / <alpha-value>)",
        },
        accent: {
          1: "rgb(var(--accent-1-color) / <alpha-value>)",
          2: "rgb(var(--accent-2-color) / <alpha-value>)",
          3: "rgb(var(--accent-3-color) / <alpha-value>)",
        },
      },
      boxShadow: {
        // top: "0px 6px 30px 0px rgba(0,0,0,0.20)",
        top: "0 10px 15px 10px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".pb-nav-save": {
          paddingBottom: "var(--nav-height)",
        },
        ".pb-nav-overlapping": {
          paddingBottom: "var(--nav-height-overlapping)",
        },
      });
    }),
  ],
};
