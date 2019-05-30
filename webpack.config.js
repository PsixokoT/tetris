const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const path = require('path');

module.exports = {
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.json']
  },
  mode: process.env.NODE_ENV || 'development' || 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          emitErrors: true
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [  // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.resolve(__dirname, 'src', 'public', 'index.html')
    })
  ],
  devServer: {  // configuration for webpack-dev-server
    contentBase: './src/public',  //source of static assets
    port: 7700, // port to run dev-server
  }
};
