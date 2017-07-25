var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'public');
var DIST_DIR = path.resolve(__dirname, 'public/dist');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    // disable: process.env.NODE_ENV === "development"
});

module.exports = {
	entry: SRC_DIR + '/src/index.js',
	output: {
		path: DIST_DIR + '/src/',
		filename: 'bundle.js',
		publicPath: '/public/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: SRC_DIR,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-1', 'env']
				}
			},
			{
	        test: /\.less$/,
	        use: extractSass.extract({
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "less-loader"
              }],
              // use style-loader in development
              fallback: "style-loader"
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
    new ExtractTextPlugin("style.css"),
  ]

};
