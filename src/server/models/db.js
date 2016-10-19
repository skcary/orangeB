import Sequelize from 'sequelize'
import config from '../../config'

const database = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  storage: config.db.storage,
  logging: false
})

export const Item = database.define('item', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  title: Sequelize.STRING, //商品名
  avater: Sequelize.TEXT, //商品宣传图地址
  desc: Sequelize.TEXT, //商品简介
  content: Sequelize.TEXT, //商品详情
  price: Sequelize.NUMBER, //售价
  priceoff: Sequelize.NUMBER, //折后价
  sellstart: Sequelize.DATE, //上架时间
  sellend: Sequelize.DATE //下架时间
})

export const Order = database.define('order', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  count: Sequelize.INTEGER,
  itemid: {
    type: Sequelize.INTEGER,
    references: {
      model: Items,
      key: 'id'
    }
  }
})

export const Topic = database.define('topic', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING, //文章名
  avater: Sequelize.TEXT, //文章宣传图地址
  desc: Sequelize.TEXT, //文章简介
  content: Sequelize.TEXT, //详情
  createtime: Sequelize.DATE,
  updatetime: Sequelize.DATE,
})

export const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING,
  avater: Sequelize.TEXT,
  phone: Sequelize.NUMBER,
  addr: Sequelize.STRING
})

Promise.all([Item.sync(), Order.sync(), Topic.sync(), User.sync()]).then(() => {
  console.log('All tables have synced!')
})
