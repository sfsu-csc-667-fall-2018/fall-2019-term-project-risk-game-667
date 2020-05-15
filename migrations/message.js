'use strict'

const { MESSAGE_TABLE } = require('../config/const')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(MESSAGE_TABLE, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sent: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
        allowNull: false,
      },
      sender_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sender_username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chat_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(MESSAGE_TABLE)
  },
}
