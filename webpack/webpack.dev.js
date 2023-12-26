// webpack.dev.js
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
          "css-loader",
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
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
    ],
  },
});
