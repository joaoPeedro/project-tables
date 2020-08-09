const path = require('path');
//const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      
      /*{
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },*/

      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
    ],
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    /*watchContentBase: true,
    historyApiFallback: true,*/
  },

  plugins: [
    /*new HtmlWebPackPlugin({
      template: './src/index.html',
    }),*/
  ],
};