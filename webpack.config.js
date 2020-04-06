const path = require('path')

module.exports = {
  entry: {
    game: './public/javascripts/index.js',
    chat: './public/javascripts/chat.js',
    landing: './public/javascripts/landing.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts'),
    filename: '[name].bundle.js',
  },
}
