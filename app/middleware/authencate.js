module.exports = {
  checkLogin: (req, res, next) => {
    if (req.user) {
      next()
    } else {
      next(new Error('用户未登录'))
    }
  },
  errorHandle: (error, req, res, next) => {
    if (error) {
      // 当token验证失败时会抛出如下错误
      if (error.name === 'UnauthorizedError') {
        // 这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        res.status(401).send('invalid token...')
      } else {
        res.json(`msg:${error}`)
      }
    }
    next()
  }
}
