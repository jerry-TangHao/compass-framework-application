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
        type: "javascript/auto",
        use: {
          loader: 'raw-loader',
        },
      },
      {
        test: /\.json$/i,
        type: "javascript/auto",
        use: [
          {
            loader: 'json-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(wasm)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: 'webpack-node-file-loader',
            options: {
              esModule: false,
              outputPath: 'wasm',
              publicPath: "../wasm/",
            },
          },
        ],
      },
      {
        test: /\.(icu)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: 'webpack-node-file-loader',
            options: {
              esModule: false,
              outputPath: 'icu4js',
              publicPath: "../wasm/",
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: 'webpack-node-file-loader',
            options: {
              esModule: false,
              outputPath: 'img',
              publicPath: "../img/",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: 'webpack-node-file-loader',
            options: {
              esModule: false,
              outputPath: 'font',
              publicPath: "../font/",
            },
          },
        ],
      },
      {
        test: /\.(mp3|wav)$/i,
        type: "javascript/auto",
        use: [
          {
            loader: 'webpack-node-file-loader',
            options: {
              esModule: false,
              outputPath: 'audio',
              publicPath: "../audio/",
            },
          },
        ],
      },
    ],
  },
  experiments: {
    syncWebAssembly: true,
    asyncWebAssembly: true,
    topLevelAwait: true,
  },
};
