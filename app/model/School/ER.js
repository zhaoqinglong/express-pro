const Class = require('./Class')
const Teacher = require('./Teacher')
const TeacherClass = require('./TeacherClass')

Class.belongsToMany(Teacher, {
  through: TeacherClass,
  foreignKey: 'fk_class'
})

const TeacherClassRelation = Teacher.belongsToMany(Class, {
  through: TeacherClass
})

module.exports = TeacherClassRelation
