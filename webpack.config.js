const path = require('path')
const webpack = require('webpack')


const vendorPackages = [
  'react',
  'react-dom',
  'react-redux',
  'react-router-redux',
  'redux',
  'axios',
  'immutable',
  'bluebird',
  'memoizee',
  'moment',
  'ramda',
  'redux-thunk',
  'redux-undo',
  'reselect',
  'classnames',
  'react-addons-css-transition-group',
  path.resolve(__dirname, './lib/index')
]

module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    })
  ],
  entry: {
    app: [
      './demo/src/javascript/app.jsx'
    ],
    vendor: vendorPackages
  },
  output: {
    path: path.join(__dirname, 'demo', 'dist')
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'demo', 'src', 'javascript')
        ]
      }
    ],
    loaders: [
      { test: /\.svg$/, loader: 'raw' },
      {
        loader: 'babel',

        include: [
          path.resolve(__dirname, 'demo', 'src', 'javascript')
        ],

        test: /\.jsx?$/
      }
    ]
  },
  devtool: 'eval-cheap-module-source-map'
}
