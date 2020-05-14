'use strict'

const { GAME_TABLE } = require('../config/const')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(GAME_TABLE, {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      phase: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      turn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      current_player: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      current_action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      battle_result: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      player_one: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      player_two: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      players_state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      countries_state: {
        type: Sequelize.STRING(3500),
        allowNull: false,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(GAME_TABLE)
  },
}
