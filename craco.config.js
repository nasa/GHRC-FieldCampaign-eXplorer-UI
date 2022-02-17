module.exports = {
  eslint: {
    enable: true,
    //https://github.com/gsoft-inc/craco/issues/85
    loaderOptions: (eslintOptions) => {
      return { ...eslintOptions, ignore: true }
    },
  },
  plugins: [{ plugin: require("craco-plugin-react-hot-reload") }],
}
