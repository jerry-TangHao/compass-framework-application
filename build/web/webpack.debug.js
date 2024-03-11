const path = require('path');
const { merge } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const common = require('./webpack.config');
const { project } = require('../project.config');

const resolve = (url) => path.resolve(__dirname, "../..", url);

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  plugins: [
    new CleanWebpackPlugin(),
    new ESLintPlugin({
      overrideConfigFile: resolve(".eslintrc.js"),
      context: resolve("src"),
      extensions: ['ts', 'js'],
      fix: true,
    }),
    new ProgressBarWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: project,
      scriptLoading: 'blocking',
    }),
  ],
  externals: {},
  output: {
    filename: 'js/[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: project,
    path: resolve('dist/web'),
  },
});
