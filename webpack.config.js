var path = require('path')
var webpack = require('webpack')
var env = process.env.NODE_ENV

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist/',
    filename: 'frontend.js'
  },
  devServer: {
    port: 9000,
    inline: true
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'style-loader!css-loader!stylus-loader'
      },
      { test: /\.svg/, loader: 'svg-url-loader'}
    ]
  },
  plugins: [
   new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}