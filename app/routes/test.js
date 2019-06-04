const express = require('express')
const route = express.Router()
const Country = require('../model/Country/Country')
const City = require('../model/Country/City')
const {
  Player,
  Team
} = require('../model/Team/Team')
const {
  token
} = require('../../config/plugin.jwt')
const {
  addtransaction,
  transError,
  manualTransaction,
  teacherTrans
} = require('../service/membership/userTransaction')
const { publishMsg, consumeMsg } = require('../controller/mqController')
route.get('/country', (req, res, next) => {
  City.findAll({
    include: [Country]
  }).then(city => {
    res.send({
      city
    })
  }).catch(err => {
    res.send({
      err
    })
  })
})
route.get('/cityUpdate', (req, res, next) => {
  City.update({
    name: 'test'
  }, {
    where: {
      id: 1
    }
  }).then((count, row) => {
    res.json({
      count,
      row
    })
  }).catch(err => {
    res.send(err.message)
  })
})
route.get('/test', (req, res, next) => {
  addtransaction().then(trans => {
    console.log(trans)
  })
  res.send('自动事务执行成功')
})
route.get('/testtrans', (req, res, next) => {
  transError().then(trans => {
    console.log(trans)
  })
  res.send('事务回滚')
})
route.get('/testmantrans', (req, res, next) => {
  manualTransaction().then(trans => {
    console.log(trans)
  })
  res.send('非托管事务')
})
route.get('/teacherTrans', (req, res, next) => {
  teacherTrans().then(trans => {
    console.log(trans)
  })
  res.send('非托管事务')
})
route.get('/token', (req, res, next) => {
  res.json({
    token
  })
})

route.get('/testteam', (req, res, next) => {
  Player.findById(1, {
    include: [Team]
  }).then(player => {
    res.send(player)
  }).catch(err => {
    res.send(err)
  })
})

route.get('/publishmsg', (req, res, next) => {
  publishMsg(req, res, next)
})

route.get('/consumemsg', (req, res, next) => {
  consumeMsg(req, res, next)
})

module.exports = route
