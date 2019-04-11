const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const Image = dbCtx.define('image', {
  name: Sequelize.STRING
}, {
  tableName: 'blog_image',
  underscored: true
})

module.exports = Image
