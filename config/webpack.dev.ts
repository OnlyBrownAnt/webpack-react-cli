import { merge } from 'webpack-merge'
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import Common from "./webpack.common";

const config: Configuration & { devServer?: DevServerConfiguration } = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: 'http://example.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    ]
  }
}

export default merge(Common, config)
