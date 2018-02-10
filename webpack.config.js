const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'validate.it.js',
    path: path.resolve(__dirname, 'build'),
    library: 'validateit',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        }
      }
    ]
  }
};