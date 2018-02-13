const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'validate.it.js',
    path: path.resolve(__dirname, 'build'),
    library: 'validate',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-0'],
          }
        }
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
  watch: true,
};