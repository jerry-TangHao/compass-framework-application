const TerserWebpackPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config');
const { project } = require('../project.config');

const resolve = (url) => path.resolve(__dirname, "../..", url);

module.exports = merge(common, {
  mode: 'production',
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
    new WebpackObfuscator({
      compact: true,
      renameProperties: true,
      renamePropertiesMode: 'safe',
      seed: Date.now(),
      selfDefending: true,
      reservedNames: ['^[a-z-A-Z][a-zA-Z0-9-_]+$', '__sys_stat64'],
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: project,
      scriptLoading: 'blocking',
    }),
  ],
  externals: {},
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        minify: TerserWebpackPlugin.uglifyJsMinify,
        terserOptions: {},
        extractComments: false,
      }),
    ],
  },
  output: {
    filename: 'js/[name].js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: project,
    path: resolve('dist/web'),
  },
});
