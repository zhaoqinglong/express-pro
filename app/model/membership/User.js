const Sequelize = require('sequelize')
const bcryptjs = require('bcryptjs')
const dbCtx = require('../../../database/dbCtx')

const User = dbCtx.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'system_user',
  underscored: true,
  // 软删除
  paranoid: true
})

// 钩子函数
User.beforeSave((user, options) => {
  return bcryptjs.hash(user.password, 12).then(hashedPw => {
    user.password = hashedPw
  })
})

// 静态方法
User.exists = async function (username) {
  let flag = await User.count({
    where: {
      username
    }
  })
  return flag > 0
}

// 实例方法 instance method
User.prototype.comparePassword = function (password) {
  // this 表示本对象，不能使用箭头函数
  console.log('this', this)
  return bcryptjs.compareSync(password, this.password)
}
module.exports = User
