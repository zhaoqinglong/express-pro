const express = require('express')
const route = express.Router()
// const multer = require('multer')
const fs = require('fs')
const urlencode = require('urlencode')
// const upload = multer({
//   dest: 'uploads/'
// })

const uploadfile = require('../../config/plugin.multer')
// route.post('/upload', upload.single('avatar'), (req, res, next) => {
//   res.send('上传成功')
// })

route.post('/uploadfile', uploadfile.single('avatar'), (req, res, next) => {
  res.send('上传成功')
})

route.get('/download', (req, res, next) => {
  var file = fs.createReadStream('./uploads/文档.docx')
  res.writeHead(200, {
    'Content-Type': 'application/force-download; charset=GBK',
    'Content-Disposition': "attachment; filename* = UTF-8''" + urlencode('文档.docx', 'utf-8')
  })
  file.pipe(res)
})

module.exports = route
