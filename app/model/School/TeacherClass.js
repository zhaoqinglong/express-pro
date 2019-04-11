const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')

const TeacherClass = dbCtx.define('teacherClass', {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: sequelize.STRING
  }
}, {
  tableName: 'school_teacher_class',
  underscored: true
})

module.exports = TeacherClass
