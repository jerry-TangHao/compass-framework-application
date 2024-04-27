const path = require('path');
const { project } = require('../project.config');

const resolve = (url) => path.resolve(__dirname, "../..", url);

module.exports = {
  entry: {
    [project]: resolve("src/index.ts"),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
    fallback: {
      path: false,
      zlib: false,
      fs: false,
      tls: false,
      http: false,
      os: false,
      url: false,
      https: false,
      net: false,
      stream: false,
      crypto: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(xml|text|txt)$/,
        use: {
          loader: 'raw-loader',
        },
        type: "javascript/auto",
      },
      {
        test: /\.json$/i,
        use: [
          {
            loader: 'json-loader',
            options: {
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 0,
              outputPath: 'img',
              name: '[name].[ext]?[hash]',
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /\.(wasm)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'wasm',
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /\.(icu)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'icu4js',
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /\.(mp3|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'audio',
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'font',
              esModule: false,
            },
          },
        ],
        type: "javascript/auto",
      },
    ],
  },
  experiments: {
    syncWebAssembly: true,
    asyncWebAssembly: true,
    topLevelAwait: true,
  },
};
