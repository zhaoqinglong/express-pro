const TeacherClass = require('../../model/School/TeacherClass')
const Class = require('../../model/School/Class')
const Teacher = require('../../model/School/Teacher')
class TeacherClassManager {
  create (input, callback) {
    // let theclass = Class.build({
    //   name: '一年级'
    // }).save()
    // let teacher = Teacher.build({
    //   name: '张三',
    //   subject: '语文'
    // }).save()
    Promise.all([Class.build({
      name: '一年级'
    }).save(), Teacher.build({
      name: '张三',
      subject: '语文'
    }).save()]).then(
      ([theclass, teacher]) => {
        TeacherClass.build({
          code: 'code1',
          fk_class: theclass.id,
          teacher_id: teacher.id
        }).save().then(teacherclass => {
          callback(null, {
            teacherclass
          })
        }).catch(err => {
          console.log(err)
          callback(err, {
            msg: '出错了'
          })
        })
      })
  }
  getTeacherClass (input, cb) {
    TeacherClass.findAll({
      include: [Teacher]
    }).then(teacherclass => {
      cb(null, teacherclass)
    }).catch(err => {
      cb(err, {
        msg: '出错了'
      })
    })
  }
}

module.exports = TeacherClassManager
