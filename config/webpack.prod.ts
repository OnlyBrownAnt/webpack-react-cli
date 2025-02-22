import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import Common from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const config: Configuration = {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[hash:base64]",
                namedExport: false,
                exportLocalsConvention: "camelCase",
              },
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimize: true, // 告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle
    minimizer: [
      // 允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new TerserPlugin({
        terserOptions: {
          // 压缩配置
          compress: {
            drop_console: false, // 去除 console
            drop_debugger: true, // 去除 debugger
            pure_funcs: ["console.log"], // 移除指定函数
          },
          // 匹配处理
          format: {
            comments: false, // 去除所有注释
          },
        },
        extractComments: false, // 是否将注释剥离到单独的文件中
      }),
      new CssMinimizerPlugin({
        // 默认开启
        // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
};

export default merge(Common, config);
