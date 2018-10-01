var path = require('path')
var webpack = require('webpack')
var env = process.env.NODE_ENV
const stylus = require('stylus')

module.exports = (env, options) => {
  return {
    entry: path.join(__dirname, './src/index.js'),
    output: {
      path: path.join(__dirname, '/dist'),
      publicPath: '/dist/',
      filename: 'frontend.js'
    },
    resolve: {
      extensions: ['.js', '.styl']
    },
    devServer: {
      port: 9000,
      inline: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
              plugins: [require('babel-plugin-transform-object-rest-spread')]
            },
          }
        },
        {
          test: /\.styl$/,
          include: [
            path.resolve(__dirname, 'src')
          ],
          use: [
            'style-loader',
            'css-loader',
            'stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
          ]
        },
        { test: /\.svg/,
          use: [
            { loader: 'svg-url-loader' }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            { loader: 'file-loader' }
          ]
        }
      ]
    },
    plugins: [
     new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    ]
  }
}
