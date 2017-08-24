const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

module.exports = {
  target: 'web',
  entry: {
    app: './index.js',
    common: './src/js/lib/jquery.js'
  },
  output: {
    //导出目录
    path: path.resolve(__dirname, 'dist'),
    //包规范
    library: 'Mylibrary',
    libraryTarget: 'umd',
    //hash
    // hashDigestLength: 3,
    //导出文件
    filename: '[name].js',
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, 'src/js/app'),
      lib: path.resolve(__dirname, 'src/js/lib')
    }
  },
  plugins: [
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity
    })
  ],
  module: {
    rules: [
      {
        test: /(\.js | \.jsx)$/,
        exclude: [
          'node_modules'
        ],
        use: [{
          loader: 'babel-loader',
        }]
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        })
      }
    ]
  }
}