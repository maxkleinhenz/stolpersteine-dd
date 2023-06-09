/** @type {import('tailwindcss').Config} */
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
    },
  },
  plugins: [],
};
