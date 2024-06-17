const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require("craco-babel-loader");

// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  eslint: {
    enable: true,
    //https://github.com/gsoft-inc/craco/issues/85
    loaderOptions: (eslintOptions) => {
      return { ...eslintOptions, ignore: true }
    },
  },
  plugins: [{ plugin: require("craco-plugin-react-hot-reload") },
            //This is a craco plugin: https://github.com/sharegate/craco/blob/master/packages/craco/README.md#configuration-overview
            { plugin: rewireBabelLoader,
              options: {
                includes: [resolveApp("node_modules/chart.js")], //put things you want to include in array here
              }
            }],
}
