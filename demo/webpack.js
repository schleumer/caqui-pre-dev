var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var path = require('path');
var fs = require('fs');

var package = require('./package.json');

var vendorPackages = package.frontendDependencies;

var express = require('express');

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var app = express();

var compiler = webpack({
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      minChunks: Infinity
    })
  ],
  entry: {
    app: [
      './src/app.js',
    ],
    vendor: vendorPackages
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/",
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  module: {
    loaders: [
      {
        loader: "babel",

        include: [
          path.resolve(__dirname, "src"),
        ],

        test: /\.jsx?$/
      }
    ]
  },
  devtool: 'eval-cheap-module-source-map'
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: "/"
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('dist'));

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
