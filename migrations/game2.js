'use strict'

const tableName = 'game_state_table'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'game_table',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      turn: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phase: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      current_player: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      player_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      player_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      result: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      countries: {
        type: Sequelize.STRING(3500),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  },
}
