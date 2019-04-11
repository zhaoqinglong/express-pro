const UserManager = require('../service/membership/UserManager')

exports.createUser = (req, res, next) => {
  const userManager = new UserManager()
  userManager.create(req.body, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

exports.getUsers = (req, res, next) => {
  res.send('users controller')
}

exports.login = async (req, res, next) => {
  const userManager = new UserManager()
  let loginRes = await userManager.login(req.body)
  res.send(loginRes)
  // userManager.login(req.body, (err, data) => {
  //   if (err) {
  //     res.send(err)
  //   } else {
  //     res.send(data)
  //   }
  // });
}

exports.updateUser = (req, res, next) => {
  const userManager = new UserManager()
  userManager.update(req.body, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.send(data)
    }
  })
}

exports.getRoles = (req, res, next) => {
  res.send('roles controller')
}
