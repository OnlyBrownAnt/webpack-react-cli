import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import { Configuration as DevServerConfiguration } from "webpack-dev-server";
import Common from "./webpack.common";

const config: Configuration & { devServer?: DevServerConfiguration } = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: process.env.APP_BASE_URL_PROXY,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    ],
  },
};

export default merge(Common, config);
