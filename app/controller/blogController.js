const BlogManager = require('../service/blog/BlogManager')
const TeacherClassManager = require('../service/membership/TeacherClassManager')
exports.createImageComment = (req, res, next) => {
  let blogManager = new BlogManager()
  blogManager.createImage(req.body, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

exports.getImageComment = (req, res, next) => {
  let blogManager = new BlogManager()
  blogManager.getimage(req.body, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

exports.createTeacherClass = (req, res, next) => {
  let manager = new TeacherClassManager()
  manager.create(req.body, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}
exports.getTeacherClass = (req, res, next) => {
  let manager = new TeacherClassManager()
  manager.getTeacherClass(req.body, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}
