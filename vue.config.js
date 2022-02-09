module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/stolpersteine-dd/" : "/",
  css: {
    loaderOptions: {
      scss: {
        // sassOptions?: {
        //   indentedSyntax: true,
        // },
        prependData: `
          @use "sass:color";
          @import "@/styles/_variables.scss";
        `,
      },
    },
  },
};
