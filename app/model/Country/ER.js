const City = require('./City')
const Country = require('./Country')
// 使用hasMany建立关联关系，关系建立在target端，会在City上建立一个外键，该列名称默认为country_id
// const fkcountry =
Country.hasMany(City, {
  foreignKey: 'fk_country'
})

// 使用belongsTo建立关联关系，关系建立在source端，
// 在city上建立一个外键，该列名称为指定值
const citycountry = City.belongsTo(Country, {
  foreignKey: 'fk_country'
})

// 多对多关系

module.exports = citycountry
