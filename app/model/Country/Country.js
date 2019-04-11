const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const Country = dbCtx.define('country', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  code: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'adm_country',
  underscored: true
})

module.exports = Country
