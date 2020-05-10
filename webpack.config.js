const path = require('path')

module.exports = {
  entry: {
    game: './public/javascripts/game.js',
    chat: './public/javascripts/chat.js',
    landing: './public/javascripts/landing.js',
    navbar: './public/javascripts/navbar.js',
    validators: './public/javascripts/validators.js',
    lobby: './public/javascripts/lobby.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts/bundles'),
    filename: '[name].bundle.js',
  },
}
