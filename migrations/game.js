'use strict'

const tableName = 'game_table'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created: {
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
