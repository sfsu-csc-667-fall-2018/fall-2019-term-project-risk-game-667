'use strict'

const tableName = 'state_table'

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
      raw: {
        type: Sequelize.STRING(5000),
        allowNull: false
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
