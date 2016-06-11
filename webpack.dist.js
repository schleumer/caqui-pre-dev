const webpack = require('webpack')

const config = require('./webpack.config.js')

config.plugins = config.plugins.concat([
  new webpack.optimize.UglifyJsPlugin({})
])

config.devtool = false

const compiler = webpack(config)

compiler.run(function (err, stats) {
  console.log(stats.toString())
})
