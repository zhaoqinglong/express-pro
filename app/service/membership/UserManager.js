const User = require('../../model/membership/User')

class UserManager {
  // constructor (userRepo) {
  //   this.userRepo = userRepo || require('../../model/membership/User')
  // }
  async create (input, callback) {
    let {
      username,
      password,
      email
    } = input
    // 判断用户名是否重复
    let flag = await User.exists(username)
    if (!flag) {
      User.build({
        username,
        password,
        email
      }).save().then(user => {
        callback(null, {
          result: true,
          msg: '创建成功'
        })
      })
    } else {
      callback(null, {
        result: false,
        msg: '该用户名已存在'
      })
    }
  }
  login (input, callback) {
    let {
      username,
      password
    } = input
    let res = User.findOne({
      where: {
        username
      }
    }).then(user => {
      // console.log(user);
      if (user) {
        // 比较密码
        if (user.comparePassword(password)) {
          return {
            result: true,
            msg: '登陆成功'
          }
        } else {
          return {
            result: false,
            msg: '密码错误'
          }
        }
      } else {
        return {
          result: false,
          msg: '该用户不存在'
        }
      }
    }).catch(err => {
      return {
        result: false,
        msg: `服务器出错了，${err}`
      }
    })
    return res
  }
  update (input, callback) {
    let {
      id,
      password,
      email
    } = input
    // 查询待修改的的实体
    User.findOne({
      where: {
        id
      }
    }).then(user => {
      if (user) {
        if (password) {
          user.password = password
        }
        user.email = email
        user.save()
        return callback(null, {
          result: true,
          msg: '修改成功'
        })
      } else {
        return callback(null, {
          result: false,
          msg: '未查到该用户'
        })
      }
    }).catch(err => {
      return callback(err, {
        result: false,
        msg: `服务器出错了，${err}`
      })
    })
  }
}
module.exports = UserManager
