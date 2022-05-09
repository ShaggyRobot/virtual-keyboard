// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

console.log('Mode is: ', process.env.NODE_ENV);

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    watchFiles: './src',
    open: true,
    host: 'localhost'
  },

  plugins: [
    ...(isProduction ? [new CleanWebpackPlugin()] : []),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: true,
      inject: 'body'
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  }
};
