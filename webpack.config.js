const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    chat: './public/javascripts/chat.js',
    landing: './public/javascripts/landing.js',
    navbar: './public/javascripts/navbar.js',
    validators: './public/javascripts/validators.js',
    lobby: './public/javascripts/lobby.js',
    lobby_scene: './public/javascripts/lobby-scene/index.js',
    game: './public/javascripts/game/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/javascripts/bundles'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components|)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  performance: {
    hints: false,
  },
}
