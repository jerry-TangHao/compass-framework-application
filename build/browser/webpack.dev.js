const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const common = require('./webpack.config');
const { project } = require('../project.config');

const resolve = (url) => path.resolve(__dirname, "../..", url);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  plugins: [
    new ProgressBarWebpackPlugin(),
    new ESLintPlugin({
      overrideConfigFile: resolve(".eslintrc.js"),
      context: resolve("src"),
      extensions: ['ts', 'js'],
      fix: true,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: project,
      scriptLoading: 'blocking',
    }),
  ],
  externals: {
    "compass-library": "compass-library",
    "compass-core": "compass-core",
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    library: project,
    libraryTarget: 'umd',
  },
  devServer: {
    host: '127.0.0.1',
    port: 'auto',
    static: './',
    hot: true,
    bonjour: true,
    client: {
      progress: true,
      overlay: true,
    },
  },
});
