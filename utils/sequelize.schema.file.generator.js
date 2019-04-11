'use strict'
// How to use?
// 1. Create `sequelize-schema-file-generator.js` in your app root
// 2. Make sure you've ran the `sequelize init` before (It should create `config`,`seeders`,`migrations` folders).
// 3. Update `DATABASE_DSN` below to match your connection string (works with any database adapter that Sequelize supports)
// 4. Run it with `node sequelize-schema-file-generator.js`
// 5. Review the generated migrations inside of the `migrations` folder.

const DATABASE_DSN = 'postgres://postgres:123456@localhost:5432/aims_test'

/* jscs:disable */
var models = require('../app/model/membership/User').sequelize.models
var Sequelize = require('sequelize')
var fs = require('fs')

delete models.default

const sequelize = new Sequelize(DATABASE_DSN)

// The priority is to create first tables that others by restriction to create an association first, before the table is created.
// is write in name of file migration. example : 201703291645-01-user.js this file run first that 201703291645-02-user-grant.js

for (let model in models) {
  var priority = ''

  if (model == 'country') {
    priority = '01'
  }
  if (model == 'identification_type') {
    priority = '02'
  }
  if (model == 'gender') {
    priority = '03'
  }
  if (model == 'profile') {
    priority = '03'
  }
  if (model == 'user') {
    priority = '04'
  }
  if (model == 'studio') {
    priority = '05'
  }
  if (model == 'staff') {
    priority = '06'
  }
  if (model == 'card_type') {
    priority = '07'
  }
  if (model == 'city') {
    priority = '08'
  }
  if (model == 'how_know_us') {
    priority = '08'
  }
  if (model == 'customer') {
    priority = '09'
  }
  if (model == 'goal') {
    priority = '09'
  }
  if (model == 'preference') {
    priority = '09'
  }
  if (model == 'class_type') {
    priority = '09'
  }
  if (model == 'tax') {
    priority = '09'
  }
  if (model == 'customer_preference') {
    priority = '10'
  }
  if (model == 'unit_measurement') {
    priority = '10'
  }
  if (model == 'class') {
    priority = '10'
  }
  if (model == 'membership') {
    priority = '11'
  }
  if (model == 'class_membership') {
    priority = '12'
  }
  if (model == 'invoice_status') {
    priority = '13'
  }
  if (model == 'purchase_order') {
    priority = '14'
  }
  if (model == 'payment_method') {
    priority = '14'
  }
  if (model == 'schedule_repeat') {
    priority = '15'
  }
  if (model == 'scheduled_class_status') {
    priority = '15'
  }
  if (priority == '') {
    priority = '16'
  }

  let attributes = models[model].attributes

  for (let column in attributes) {
    delete attributes[column].Model
    delete attributes[column].fieldName
    delete attributes[column].field
    for (let property in attributes[column]) {
      if (property.startsWith('_')) {
        delete attributes[column][property]
      }
    }

    if (typeof attributes[column]['type'] !== 'undefined') {
      if (typeof attributes[column]['type']['options'] !== 'undefined' && typeof attributes[column]['type']['options'].toString === 'function') {
        attributes[column]['type']['options'] = attributes[column]['type']['options'].toString(sequelize)
      }

      if (typeof attributes[column]['type'].toString === 'function') {
        attributes[column]['type'] = attributes[column]['type'].toString(sequelize)
      }
    }
  }

  let schema = JSON.stringify(attributes, null, 4)
  let tableName = models[model].tableName
  let indexes = ['\n']

  if (models[model].options.indexes.length) {
    models[model].options.indexes.forEach((obj) => {
      indexes.push('        .then(() => {')
      indexes.push('            return queryInterface.addIndex(')
      indexes.push(`                '${tableName}',`)
      indexes.push(`                ['${obj.fields.join("','")}']`)

      let opts = {}
      if (obj.name) {
        opts.indexName = obj.name
      }
      if (obj.unique === true) {
        opts.indicesType = 'UNIQUE'
      }
      if (obj.method === true) {
        opts.indexType = obj.method
      }
      if (Object.keys(opts).length) {
        indexes.push(`                , ${JSON.stringify(opts)}`)
      }

      indexes.push('            )')
      indexes.push('        })')
    })
  }

  schema = schema.split('\n').map((line) => '            ' + line).join('\n')
  // with respect original file remove  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  // and  return queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1') because postgres dont work only for mysql
  let template = `'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
            return queryInterface.createTable('${tableName}',
${schema})
        ${indexes.join('\n')}
      
    },
    down: function(queryInterface, Sequelize) {
     
            return queryInterface.dropTable('${tableName}');
     
    }
};`

  let d = new Date()

  let filename = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((num) => num <= 60 && (num + 100).toString().substring(1) || num)
    .join('') + `-` + priority + `-${models[model].tableName}`

  fs.writeFileSync(`../migrations/${filename}.js`, template)
};
