// webpack.common.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')

// 配置业务环境变量
require('dotenv').config({
  path: `.env.${process.env.REACT_APP_ENV}`
})

// react-pdf cmaps 资源拷贝处理
const cMapsDir = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps');
// react-pdf fonts 资源拷贝处理
const standardFontsDir = path.join(
  path.dirname(require.resolve('pdfjs-dist/package.json')),
  'standard_fonts',
);

module.exports = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "../dist"), // 打包后的代码放在dist目录下
    filename: "static/js/[name].[contenthash:8].js", // 打包的文件名
    clean: true,
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: [".mjs", ".js", ".json", ".jsx", ".ts", ".tsx"], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets:
                  "iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead", // 根据项目去配置
                  // 如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块。使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shaking 等优化措施。
                  modules: false,
                  useBuiltIns: "usage", // 该选项配置如何@babel/preset-env处理polyfills
                  corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ["@babel/preset-typescript"], // typescript 环境
              ["@babel/preset-react"], // react 环境
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]",
        },
      },
      {
        test: /\.(eot|ttf|otf|woff|woff2)$/i,
        type: "asset/resource",
        // 字体文件不需要转换
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 25 * 1024, // 25kb
        //   },
        // },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]",
        },
      },
      {
        test: /\.(pdf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/pdf/[name][ext]",
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `.env.${process.env.REACT_APP_ENV}`
    }),
    new HtmlWebpackPlugin({
      title: 'React APP',
      publicPath: process.env.REACT_APP_PUBLIC_URL,
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      template: path.resolve(__dirname, "../public/index.html"), // 使用自定义模板
    }),
    // 拷贝资源文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
        // react-pdf cmaps 资源拷贝处理
        { from: cMapsDir, to: 'cmaps/' },
        // react-pdf fonts 资源拷贝处理
        { from: standardFontsDir, to: 'standard_fonts/' },
      ],
    }),
  ],
};
