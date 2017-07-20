var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'public');
var DIST_DIR = path.resolve(__dirname, 'dist');

module.exports = {
	entry: SRC_DIR + '/src/index.js',
	output: {
		path: DIST_DIR + '/src/',
		filename: 'client_bundle.js',
		publicPath: '/src/'
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
			}
		]
	}

};