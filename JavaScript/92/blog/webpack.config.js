const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    publicPath: '',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      { 
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
        title: 'My Blog App',
        favicon: './src/icon.ico',
        template: './src/index.html'
    }),
  ],
  optimization: {
      splitChunks: {
          chunks: 'all',
      }
  },
  performance: { 
    hints: false 
  },
  devtool: 'source-map'
};