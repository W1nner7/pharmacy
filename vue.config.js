module.exports = {
  // css: {
  //   requireModuleExtension: false,
  // },
  // scss: {
  //   additionalData: `@import "~@/assets/scss/*.scss";`,
  // },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/pharmacy/" : "/",
};
