var path = require('path');

var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.config.common.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = 'production';
const API_URL = 'https://localhost:3000'

module.exports = webpackMerge.smart(commonConfig, {
  entry: {
    'app': './client/app/main.aot.ts'
  },

  output: {
    path: path.resolve(__dirname + '/public/js/app'),
    filename: '[name].js',
    publicPath: '/js/app/',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'API_URL': JSON.stringify(API_URL),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
  ]
});
