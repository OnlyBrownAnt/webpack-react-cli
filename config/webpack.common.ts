import path from "path";
import { Configuration } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv";
import DotenvWebpack from "dotenv-webpack";

Dotenv.config({ path: `.env.${process.env.APP_ENV}` });

const config: Configuration = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx?|tsx?)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack React Project",
      publicPath: process.env.APP_PUBLIC_URL,
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public/"),
          to: path.resolve(__dirname, "../dist/"),
          globOptions: {
            ignore: [path.resolve(__dirname, "../public/index.html")],
          },
        },
      ],
    }),
    new DotenvWebpack({
      path: `.env.${process.env.APP_ENV}`,
    }),
  ],
};

export default config;
