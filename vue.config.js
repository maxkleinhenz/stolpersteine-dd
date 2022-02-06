module.exports = {
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
