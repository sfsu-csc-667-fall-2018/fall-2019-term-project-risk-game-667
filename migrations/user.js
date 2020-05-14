'use strict'

const { USER_TABLE } = require('../config/const')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(USER_TABLE, {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registered: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(USER_TABLE)
  },
}
