/**
  description: 对象验证器
*/
class Validator {
  /*
    creator: 郑凯
    date: 2019-01-01
    description: 根据各验证属性，验证对象状态
  */
  validate (validators) {
    return {
      ...validators,
      error: Object.keys(validators).reduce((state, key) => {
        if (!state) {
          state = validators[key].error
        }
        return state
      }, null)
    }
  }
}

module.exports = Validator
