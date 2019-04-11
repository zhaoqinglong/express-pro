const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const Teacher = dbCtx.define('teacher', {
  name: {
    type: sequelize.STRING
  },
  subject: {
    type: sequelize.STRING
  }
}, {
  tableName: 'school_teacher',
  underscored: true
})

module.exports = Teacher
