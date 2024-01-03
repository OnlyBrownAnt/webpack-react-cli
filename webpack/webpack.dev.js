// webpack.dev.js
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development", // 开发模式
  devtool: "eval-cheap-module-source-map",
  devServer: {
    open: true, // 编译完自动打开浏览器
    hot: true,
    port: 8081,
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BASE_URL_PROXY,
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      }
    }
  },
  module: {
    rules: [
      // ...
      {
        test: /\.(css|less)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]"
              },
            },
          },
          {
            loader: "postcss-loader",
            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
            // 也包括会自动帮助我们添加 autoprefixer
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "less-loader",
        ],
        // exclude 排除 node_modules 目录
        // exclude: /node_modules/,
        // include 引入符合以下任何条件的模块
        include: [
          path.join(__dirname, '../src'), 
          path.join(__dirname, '../public'),
          // react-pdf 需要引入的css资源的路径
          path.join(__dirname, '../node_modules/react-pdf'),
          // react-resizable 需要引入的css资源的路径 
          path.join(__dirname, '../node_modules/react-resizable')
        ],
      },
    ],
  },
});
