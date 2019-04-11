const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/')
  },
  filename: function (req, file, callback) {
    // 获取文件的后缀名
    let extension = file.originalname.split('.').pop()
    callback(null, file.fieldname + '-' + Date.now() + '.' + extension)
  }
})
var upload = multer({ storage: storage })
module.exports = upload
