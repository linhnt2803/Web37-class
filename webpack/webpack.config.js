const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // entry point (source)
  entry: path.join(__dirname, 'src/main.js'),
  // output
  output: {
    filename: '[name].[contenthash].js'
  },
  // plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    })
  ],
  // module
  module: {
    rules: [
      {
        test: /\.css/i,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}