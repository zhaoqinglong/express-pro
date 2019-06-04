const q = 'tasks'
// 全局变量，存放队列的连接
var open = null

/**
 * 建立连接
 */
exports.amqpConnection = () => {
  if (open == null || open === undefined) {
    open = require('amqplib').connect('amqp://localhost')
    return open
  } else {
    return open
  }
}

/**
 * 断开连接
 */
exports.amqpDisConnection = () => {
  open = null
}

/**
 * 发布消息到队列
 */
exports.publish = (open) => {
  // Publisher
  open
    .then(function (conn) {
      return conn.createChannel()
    })
    .then(function (ch) {
      return ch.assertQueue(q).then(function (ok) {
        return ch.sendToQueue(q, Buffer.from('something to do'))
      })
    })
    .catch(console.warn)
}

/**
 * 消费者
 */
exports.consumer = (open) => {
  // Consumer
  open
    .then(function (conn) {
      return conn.createChannel()
    })
    .then(function (ch) {
      return ch.assertQueue(q).then(function (ok) {
        return ch.consume(q, function (msg) {
          if (msg !== null) {
            console.log(msg.content.toString())
            ch.ack(msg)
          }
        })
      })
    })
    .catch(console.warn)
}
