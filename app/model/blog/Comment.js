const Sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const Post = require('./Post')
const Image = require('./Image')

const Comment = dbCtx.define('comment', {
  title: Sequelize.STRING,
  commentable: Sequelize.STRING,
  commentable_id: Sequelize.INTEGER
}, {
  tableName: 'blog_comment',
  underscored: true
})

Comment.prototype.getItem = function (options) {
  return this['get' + this.get('commentable').substr(0, 1).toUpperCase() + this.get('commentable').substr(1)](options)
}
Post.hasMany(Comment, {
  foreignKey: 'commentable_id',
  constraints: false,
  scope: {
    commentable: 'post'
  }
})
Comment.belongsTo(Image, {
  foreignKey: 'commentable_id',
  constraints: false,
  as: 'image'
})

module.exports = Comment
