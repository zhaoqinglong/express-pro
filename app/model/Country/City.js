const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const City = dbCtx.define('city', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'adm_city',
  underscored: true
})

module.exports = City
