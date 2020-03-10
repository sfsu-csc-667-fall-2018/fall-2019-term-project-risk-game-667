const path = require('path');

module.exports = {
  entry: './public/javascripts/index.js',
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: 'bundle.js'
  }
};