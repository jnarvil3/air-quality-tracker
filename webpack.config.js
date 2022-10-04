const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Basic webpack config - designed to make dev process easier with support form HtmlWebpackPlugin

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader', 'css-loader', 'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname)
    },
    port: 8080, 
    compress: true,
    hot: true,
    proxy: {
      '/': 'http://localhost:3000'
    }
  }
};