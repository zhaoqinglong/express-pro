const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const expressJwt = require('express-jwt')
const config = require('./config/config.default')
const dbCtx = require('./database/dbCtx')
// const fkcountry = require('./app/model/Country/ER')
// const TeacherClassRelation = require('./app/model/School/ER')
// const Comment = require('./app/model/blog/Comment')
// const Test = require('./app/model/SMAJ/Test')
const {
  Player,
  Team
} = require('./app/model/Team/Team')
const { secret } = require('./config/plugin.jwt')
const {
  errorHandle
} = require('./app/middleware/authencate')
// 引用路由
const membershipRoute = require('./app/routes/membership')
const taxiRoute = require('./app/routes/taxi')
const fileRoute = require('./app/routes/file')
const testRoute = require('./app/routes/test')
const blogRoute = require('./app/routes/blog')
const app = express()

// 使用中间件来验证token的合法性
app.use(expressJwt({
  secret
}).unless({
  path: ['/token']
}))

// 使用bodyparser
app.use(bodyparser.urlencoded({
  extended: false
}))
app.use(bodyparser.json())
// path.join 拼接文件路径，并处理文件路径，区别linux和windows
app.use(express.static(path.join(__dirname, 'app', 'public')))
app.use('/system', membershipRoute)
app.use('/taxi', taxiRoute)
app.use('/file', fileRoute)
app.use('/blog', blogRoute)
app.use(testRoute)
app.use(errorHandle)
// 测试
// dbCtx.authenticate()
// .then(() => {
//   console.log('db connection success')
// })
// .catch(err => {
//   console.log(`err is ${err}`)
// })

app.listen(config.server.http.port, () => {
  console.log('express server is running on 9527')
  // 同步数据库
  dbCtx.sync({
    force: false
  }).then(
    () => {
      console.log('数据库已同步')
    }
  ).catch(err => {
    console.log(`sync error is ${err}`)
  })
})
