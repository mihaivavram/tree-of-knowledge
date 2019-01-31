var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '/../public');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    module: {
	    rules: [
	      {
	        test: /\.js$/,
	        exclude: /node_modules/,
	        use: {
	          loader: "babel-loader"
	        },
	      },
	      {
	        test: /\.css$/,
	        use: ["style-loader", "css-loader"]
	      }
	    ]
    },
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true
    }
}
