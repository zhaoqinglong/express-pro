const express = require('express')
const router = express.Router()
const {
  createUser,
  login,
  getUsers,
  getRoles,
  updateUser
} = require('../controller/membershipController')

router.get('/user/create', createUser)
router.get('/user/login', login)
router.post('/user/update', updateUser)
router.get('/user', getUsers)
router.get('/role', getRoles)
module.exports = router
