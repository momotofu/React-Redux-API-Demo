var fs = require('fs')
var gulp = require('gulp')
var path = require('path')
var webpack = require('webpack')
var webpackDevServer = require('webpack-dev-server')

/**
  webpack configuration
 */

var frontendConfig = {
  entry: path.join(__dirname, './src/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'frontend.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      {
        test: /\.styl$/,
        include: [
          path.resolve(__dirname, 'source')
        ],
        loader: 'style-loader!css-loader!stylus-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({quite: true})
  ]
}

/**
  tasks
 */

function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log(err)
    } else {
      console.log(stats.toString())
    }
    if (done) {
      done()
    }
  }
}

gulp.task('stack-build', (done) => {
  webpack(frontendConfig).run(onBuild(done))
})

gulp.task('stack-watch', () => {
  let compiler = webpack(frontendConfig)
  let server = new webpackDevServer(compiler, {
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    publicPath: "/dist/",
  })
  server.listen(9000, "localhost", () => {
    console.log("Webpack dev server listening at: localhost:9000")
  })
})

gulp.task('build', ['stack-build'])
gulp.task('watch', ['stack-watch'])