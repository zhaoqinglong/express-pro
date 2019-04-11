/*
 * @Author: zhaoqinglong
 * @Date: 2019-03-20 14:47:30
 * @Last Modified by: zhaoqinglong
 * @Last Modified time: 2019-03-22 10:51:13
 */
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const dbCtx = require('../../../database/dbCtx')
const buildDefaultOption = require('../../util/buildDefaultOption')
const Dictionary = dbCtx.define('dictionary', {
  label: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: true
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    field: 'parent_id'
  },
  rtPath: {
    type: Sequelize.STRING(50),
    allowNull: true,
    field: 'rt_path'
  },
  index: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: false,
  underscored: true,
  tableName: 'system_dictionary'
})
const Connector = ','

Dictionary.beforeSave((dic) => {
  if (dic.changed('parentId') && dic.parentId) {
    return Dictionary
      .findByPk(dic.parentId)
      .then(result => {
        if (result.rtPath) {
          let parents = result.rtPath.split(Connector).concat(dic.parentId)
          dic.rtPath = parents.join(Connector)
        } else {
          dic.rtPath = dic.parentId
        }
        return dic
      })
  }
})

Dictionary.isExist = function (id) {
  return Dictionary.findByPk(id)
}

Dictionary.buildOptions = function ({ keywords = '', ...raw } = {}) {
  let result = buildDefaultOption(raw)
  keywords && (result.where = {
    [Op.or]: [
      { label: { [Op.like]: `%${keywords}%` } },
      { value: { [Op.like]: `%${keywords}%` } }
    ]
  })
  return result
}

Dictionary.prototype.getParentIds = function () {
  return this.rtPath ? this.rtPath.split(Connector).map(v => Number(v)) : []
}
Dictionary.sync()
module.exports = Dictionary
