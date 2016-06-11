const path = require('path')

const express = require('express')

const webpack = require('webpack')

const config = require('./webpack.config.js')

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
])

config.output = Object.assign({}, config.output, {
  publicPath: '/',
  filename: 'bundle.js',
  sourceMapFilename: 'bundle.js.map'
})

const app = express()

const compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: false,
  publicPath: '/'
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(path.join(__dirname, 'demo', 'dist')))

app.listen(3001, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3001')
})
