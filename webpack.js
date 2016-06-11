var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var path = require("path");
var fs = require("fs");

var package = require("./package.json");

var vendorPackages = [
  "react",
  "react-dom",
  "react-redux",
  "redux",
  "axios",
  "immutable",
  "bluebird",
  "memoizee",
  "moment",
  "ramda",
  "redux-thunk",
  "redux-undo",
  "reselect"
];

var express = require("express");

var path = require("path");
var express = require("express");
var webpack = require("webpack");

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
      "./demo/src/javascript/app.jsx",
    ],
    vendor: vendorPackages
  },
  output: {
    path: path.join(__dirname, "demo", "dist"),
    publicPath: "/",
    filename: "bundle.js",
    sourceMapFilename: "bundle.js.map"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    preLoaders: [
      { 
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "demo", "src", "javascript"),
        ],
      }
    ],
    loaders: [
      { test: /\.svg$/, loader: "raw" },
      {
        loader: "babel",

        include: [
          path.resolve(__dirname, "demo", "src", "javascript"),
        ],

        test: /\.jsx?$/
      }
    ]
  },
  devtool: "eval-cheap-module-source-map"
});

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: false,
  publicPath: "/"
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, "demo", "dist")));

app.listen(3001, "localhost", function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Listening at http://localhost:3001");
});
