const { amqpConnection, amqpDisConnection, publish, consumer } = require('../util/RabbitMq')

exports.publishMsg = (req, res, next) => {
  let open = amqpConnection()
  publish(open)
  amqpDisConnection()
  res.send({
    msg: 'publish msg success'
  })
}

exports.consumeMsg = (req, res, next) => {
  let open = amqpConnection()
  consumer(open)
  amqpDisConnection()
  res.send({
    msg: 'msg consumed'
  })
}
