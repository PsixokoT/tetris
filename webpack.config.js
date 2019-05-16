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
  mode: process.env.NODE_ENV || 'production',
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
  }
};
