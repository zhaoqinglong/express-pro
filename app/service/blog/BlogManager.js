const Comment = require('../../model/blog/Comment')
const Image = require('../../model/blog/Image')
// const Post = require('../../model/blog/Post')

class BlogManager {
  createImage (input, cb) {
    Image.build({
      name: 'image1'
    })
      .save()
      .then(image => {
      // 创建comment
        Comment.build({
          title: 'imagecomment',
          commentable: 'image',
          commentable_id: image.id
        }).save().then(comment => {
          cb(null, {
            image,
            comment
          })
        })
      })
      .catch(err => {
        cb(err, {})
      })
  }
  getimage (input, cb) {
    Image.findById(1).then(
      image => {
        image
          .getComments()
          .then(comment => {
            cb(null, {
              comment,
              image
            })
              .catch(err => {
                cb(err, {})
              })
          })
      }
    ).catch(err => {
      cb(err, {})
    })
  }
}
module.exports = BlogManager
