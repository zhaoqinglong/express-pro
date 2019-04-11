const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const Position = dbCtx.define('position', {
  Name: {
    type: sequelize.STRING
  },
  Desc: {
    type: sequelize.STRING
  }
}, {
  tableName: 'system_position',
  underscored: true
})
module.exports = Position
