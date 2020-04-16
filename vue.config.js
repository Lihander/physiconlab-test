module.exports = {
  // options...
  publicPath: process.env.NODE_ENV === 'production'
    ? '/physiconlab-test/'
    : '/',
  assetsDir: '',
  filenameHashing: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/utils/vars.scss";`
      }
    }
  }
}
