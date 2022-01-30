module.exports = {
  css: {
    loaderOptions: {
      scss: {
        // sassOptions?: {
        //   indentedSyntax: true,
        // },
        prependData: '@import "@/styles/_variables.scss";',
      },
    },
  },
};
