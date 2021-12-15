const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ['./source/index.js'],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'source'),
    },
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './source/index.html',
      inject: false // Отключает автоматическую вставку тега <script> в html
    })
  ],
  // Чтобы можно было не писать расширение в модулях
  resolve: {
    extensions: ['.js']
  },

  // Отключил babel (ломает код в api.js)

  // module: {
  //   rules: [
  //     {
  //       test: /\.m?js$/,
  //       exclude: /node_modules/,
  //       use: {
  //         loader: "babel-loader",
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ]
  // }
};
