const sequelize = require('sequelize')
const dbCtx = require('../../../database/dbCtx')
const Player = dbCtx.define('player', {
  name: {
    type: sequelize.STRING
  }
}, {
  tableName: 'test_player',
  underscored: true
})
const Team = dbCtx.define('team', {
  name: {
    type: sequelize.STRING
  }
}, {
  tableName: 'test_team',
  underscored: true
})

Player.belongsTo(Team)

module.exports = {
  Player,
  Team
}
