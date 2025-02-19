import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import Common from "./webpack.common";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const config: Configuration = {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};

export default merge(Common, config);
