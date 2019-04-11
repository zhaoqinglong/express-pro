const express = require('express')
const router = express.Router()
const {
  createImageComment,
  getImageComment,
  createTeacherClass,
  getTeacherClass
} = require('../controller/blogController')
router.get('/create', createImageComment)
router.get('/image', getImageComment)
router.get('/teacher', createTeacherClass)
router.get('/teacherclass', getTeacherClass)
module.exports = router
