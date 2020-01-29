const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    //filename: '[name].js'
    filename: "[name].js"
  },
  target: "node",
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-html-loader',
        options: {
          // title: 'The Ant: An Introduction',
          weather: 19
        }
      },
    ]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     //template: "./index.html",
  //     template: "./views/index.ejs",
  //     filename: "./index.html",
  //     excludeChunks: ["server"]
  //   })
  // ]
};
