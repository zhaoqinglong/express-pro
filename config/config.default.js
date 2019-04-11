exports.server = {
  http: {
    port: 9527,
    ssl: false
  }
}
exports.sequelize = {
  database: 'aims',
  username: 'postgres',
  password: '123456',
  host: '127.0.0.1',
  dialect: 'postgres'
}
exports.msSqlServer = {
  database: 'Test',
  username: 'sa',
  password: '123qwe!@#',
  host: '.\\ZSQLSERVER',
  dialect: 'mssql'
}
