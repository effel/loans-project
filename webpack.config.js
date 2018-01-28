const path = require('path');

const webpack = require('webpack');

module.exports = {
  entry:  ["babel-polyfill", "./client/index.js"],
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
    devServer: {
    openPage: '',
    open: true,
    port: 9000,
    historyApiFallback: {
      index: 'client/index.html'
    }
  },
    module: {
        rules: [
            {
                test: [/\.js$/ , /\.jsx$/],
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',  'sass-loader']
            }
        ]
    }
  
}

