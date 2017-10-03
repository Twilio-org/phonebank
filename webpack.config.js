const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.resolve(__dirname, 'public');
const DIST_DIR = path.resolve(__dirname, 'public/dist');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: `${SRC_DIR}/src/index.jsx`,
  output: {
    path: `${DIST_DIR}/src/`,
    filename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['lodash'],
          presets: ['react', 'es2015', 'stage-1', 'env']
        }
      },
      {
        test: /\.less$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'public/index.html',
    }),
    new ExtractTextPlugin('style.css'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/), // add more locales here if needed
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]

};
