const jwt = require('jsonwebtoken')
const secret = 'salt'

const token = jwt.sign({
  name: 'test'
}, secret, {
  expiresIn: 60 * 60 // 一小时
})

module.exports = {
  token,
  secret
}
