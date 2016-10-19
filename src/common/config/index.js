import path from 'path'

export default {
  title: 'ORANGE · orange',
  domain: 'http://localhost',
  port: 3388,
  db: {
    dialect: 'sqlite',
    database: 'main',
    storage: path.join(__dirname, './server/models/db/db.sqlite')
  }
}
