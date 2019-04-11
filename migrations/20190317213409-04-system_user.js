'use strict'
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('system_user', {
      'id': {
        'type': 'INTEGER',
        'allowNull': false,
        'primaryKey': true,
        'autoIncrement': true
      },
      'username': {
        'type': 'VARCHAR(255)',
        'allowNull': false,
        'unique': true
      },
      'password': {
        'type': 'VARCHAR(255)'
      },
      'email': {
        'type': 'VARCHAR(255)'
      },
      'phone': {
        'type': 'VARCHAR(255)'
      },
      'created_at': {
        'type': 'TIMESTAMP WITH TIME ZONE',
        'allowNull': false
      },
      'updated_at': {
        'type': 'TIMESTAMP WITH TIME ZONE',
        'allowNull': false
      },
      'deleted_at': {
        'type': 'TIMESTAMP WITH TIME ZONE'
      }
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('system_user')
  }
}
