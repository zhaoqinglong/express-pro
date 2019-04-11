const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const Class = dbCtx.define('myclass', {
  name: {
    type: sequelize.STRING
  }
}, {
  tableName: 'school_class',
  underscored: true
})

module.exports = Class
