const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const Post = dbCtx.define('post', {
  name: Sequelize.STRING
}, {
  tableName: 'blog_post',
  underscored: true
})

module.exports = Post
