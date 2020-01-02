var webpack = require('webpack');

module.exports = {
    entry: "./src/app.tsx",
    output: {
      filename: "bundle.js",
      path: __dirname + "/dist"
    },
   
    devtool: "source-map",
   
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
   
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
      ]
    },
    optimization: {
      minimize: true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
    ],

    mode: "production"
  };
