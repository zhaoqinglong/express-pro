const sequelize = require('sequelize')
const msDbCtx = require('../../../database/SqlServerDbCtx')

const Test = msDbCtx.define('test', {
  name: {
    type: sequelize.STRING
  }
}, {
  tableName: 'test',
  underscored: true
})
msDbCtx.sync().then(table => {
  console.log('SQLServer同步成功', table)
}).catch(err => {
  console.log('SQLServer同步失败', err)
})
module.exports = Test
