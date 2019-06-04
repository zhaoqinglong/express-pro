const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const expressJwt = require('express-jwt')
const config = require('./config/config.default')
const dbCtx = require('./database/dbCtx')
// const { publish, consumer } = require('./app/util/RabbitMq')
const { secret } = require('./config/plugin.jwt')
const { errorHandle } = require('./app/middleware/authencate')
// 引用路由
const membershipRoute = require('./app/routes/membership')
const taxiRoute = require('./app/routes/taxi')
const fileRoute = require('./app/routes/file')
const testRoute = require('./app/routes/test')
const blogRoute = require('./app/routes/blog')
const app = express()
// const open = require('amqplib').connect(config.rabbitmq)
// publish(open)
app.use(cors())
// 使用中间件来验证token的合法性
// app.use(expressJwt({ secret }).unless({ path: ['/token', '/test'] }))
// 日志
app.use(morgan('dev'))
app.use(require('./config/plugin.morgan')('log'))
// 使用bodyparser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// path.join 拼接文件路径，并处理文件路径，区别linux和windows
app.use(express.static(path.join(__dirname, 'app', 'public')))

app.use('/system', membershipRoute)
app.use('/taxi', taxiRoute)
app.use('/file', fileRoute)
app.use('/blog', blogRoute)
app.use('/test', testRoute)
app.use(errorHandle)

app.listen(config.server.http.port, () => {
  console.log(`app server is running on ${config.server.http.port}`)
  // 同步数据库
  if (process.env.NODE_ENV === 'production') {
    dbCtx.authenticate().then(() => {
      console.log('已正常连接数据库')
    }).catch(err => {
      console.log('无法连接数据库，故障描述：', err)
    })
  } else if (process.env.NODE_ENV === 'development') {
    dbCtx.sync({ force: false }).then(_ => {
      console.log('已同步更新数据库结构')
    }).catch(err => {
      console.log('无法同步更新数据库结构，故障描述：', err)
    })
  }
})
