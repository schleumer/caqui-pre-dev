const webpack = require('webpack')

const config = require('./webpack.config.js')

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress:{
      warnings: true
    }
  })
])

config.devtool = false

const compiler = webpack(config)

compiler.run(function (err, stats) {
  console.log(stats.toString())
})
