const express = require('express')
const route = express.Router()
const {
  checkLogin
} = require('../middleware/authencate')

route.get('/order', checkLogin, (req, res, next) => {
  res.send('hello order')
})

module.exports = route
