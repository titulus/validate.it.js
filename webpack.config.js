const path = require('path');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'validate.it.js',
    path: path.resolve(__dirname, 'build'),
    library: 'validateit',
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
            presets: ['env'],
            plugins: ['add-module-exports'],
          }
        }
      }
    ]
  },
  watch: true,
};