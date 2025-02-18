import path from 'path';
import { Configuration } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin'

const config: Configuration = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].bundle.js",
    clean: true
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      "@": path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx?|tsx?)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Webpack React Project",
      publicPath: "./",
      favicon: path.resolve(__dirname, "../public/favicon.ico"),
      template: path.resolve(__dirname, "../public/index.html")
    })
  ]
}

export default config;
