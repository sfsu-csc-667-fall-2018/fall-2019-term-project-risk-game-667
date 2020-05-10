'use strict'

const tableName = 'playing_table'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      player_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      game_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      joined: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  },
}
