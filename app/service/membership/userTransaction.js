const User = require('../../model/membership/User')
const dbCtx = require('../../../database/dbCtx')
const Teacher = require('../../model/School/Teacher')
const Class = require('../../model/School/Class')
const TeacherClass = require('../../model/School/TeacherClass')
// 托管事务，自动回滚
const addtransaction = (input, callback) => {
  let user1 = {
    username: 'test',
    password: '123456'
  }
  let user2 = {
    username: 'test',
    password: '123456'
  }
  return dbCtx.transaction(function (t) {
    // 在这里链接您的所有查询。 确保你返回他们。
    return User.create(user1, {
      transaction: t
    }).then(function (user) {
      return User.create(user2, {
        transaction: t
      })
    })
  }).then(function (result) {
    console.log(result)
    // 事务已被提交
    // result 是 promise 链返回到事务回调的结果
  }).catch(function (err) {
    console.log(err)
  })
}

// 强制回滚操作
const transError = () => {
  return dbCtx.transaction(function (t) {
    return User.create({
      username: 'test',
      password: '123456'
    }, {
      transaction: t
    }).then(function (user) {
      // 查询成功，但我们仍然想回滚！
      throw new Error('强制回滚')
    })
  })
}

// 非托管事务，手动提交事务
const manualTransaction = () => {
  return dbCtx.transaction().then(function (t) {
    return User.create({
      username: 'test',
      password: '123456'
    }, {
      transaction: t
    }).then(function (user) {
      return User.create({
        username: 'test',
        password: '123456'
      }, {
        transaction: t
      })
    }).then(function (success) {
      return t.commit()
    }).catch(function (err) {
      console.log(err)
      return t.rollback()
    })
  })
}

const teacherTrans = () => {
  return dbCtx.transaction().then(function (t) {
    return Teacher.create({
      name: 'test',
      subject: 'test'
    }, {
      transaction: t
    }).then(function (teacher) {
      return Class.create({
        name: '一年级'
      }, {
        transaction: t
      })
    }).then(theclass => {
      return TeacherClass.create({
        code: '1223',
        fk_class: theclass.id,
        teacher_id: 10
      }, {
        transaction: t
      })
    }).then(function (success) {
      return t.rollback()
      // throw new Error('err')
      // return t.commit()
    }).catch(function (err) {
      console.log(err)
      return t.rollback()
    })
  })
}
module.exports = {
  addtransaction,
  transError,
  manualTransaction,
  teacherTrans
}
