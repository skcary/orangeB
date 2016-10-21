import path from 'path'

export default {
  title: 'ORANGE · orange',
  domain: 'http://localhost',
  port: 3388,
  db: {
    dialect: 'sqlite',
    database: 'main',
    storage: path.join(__dirname, './server/models/db/db.sqlite')
  },
  rootPath: '../../..',
  publicPath: '/public',
  topicPageCount: 20, //每页多少条
  productPageCount: 30, //每页多少条
  orderPageCount: 5
}
