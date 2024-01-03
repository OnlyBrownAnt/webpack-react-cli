// webpack.prod.js
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = merge(common, {
  mode: "production", // 生产模式
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader, // 生产模式使用 MiniCssExtractPlugin.loader 代替 style-loader
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[hash:base64]"
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
              // 也包括会自动帮助我们添加 autoprefixer
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
  optimization: {
    minimize: true,
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        // 默认开启
        // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: false,
            drop_debugger: true,
            pure_funcs: ['console.log'] // 移除指定函数
          },
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css", // 将css单独提测出来放在assets/css 下
    }),
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: process.env.REACT_APP_PUBLIC_URL
    })
  ],
});
