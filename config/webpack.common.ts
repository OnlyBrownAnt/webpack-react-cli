import path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].bundle.js",
    clean: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      "@": ["./src"]
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
}

export default config;
