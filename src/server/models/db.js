import Sequelize from 'sequelize'
import config from '../../config'

const database = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  storage: config.db.storage,
  logging: false
})

// product: id title thumb desc content price priceoff sellstart sellend
export const Product = database.define('product', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  thumb: Sequelize.STRING,
  desc: Sequelize.STRING,
  content: Sequelize.TEXT,
  owner: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  price: Sequelize.NUMBER,
  priceoff: Sequelize.NUMBER,
  sellstart: Sequelize.DATE,
  sellend: Sequelize.DATE,
  createtime: Sequelize.DATE
})

// order: id orderid userid totalprice status createtime
export const Order = database.define('order', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  orderid: Sequelize.STRING,
  userid: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  status: {
    type: Sequelize.ENUM,
    values: [ 'UNPAID', 'PAID', 'DEL' ],
    defaultValue: 'UNPAID'
  },
  totalprice: Sequelize.NUMBER,
  createtime: Sequelize.DATE
})

// ordermore: id orderid productid count unitprice
export const OrderMore = database.define('ordermore', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  orderid: {
    type: Sequelize.STRING,
    references: {
      model: Order,
      key: 'orderid'
    }
  },
  productid: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  count: Sequelize.INTEGER,
  unitprice: Sequelize.NUMBER
})

// topic: id title thumb desc tags content createtime updatetime author
export const Topic = database.define('topic', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  thumb: Sequelize.STRING,
  desc: Sequelize.STRING,
  tags: Sequelize.STRING,
  content: Sequelize.TEXT,
  createtime: Sequelize.DATE,
  updatetime: Sequelize.DATE,
  author: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
})

// user: id name password avater phone email addr token permission
export const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avater: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  addr: Sequelize.STRING,
  token: Sequelize.UUID,
  permission: {
    type: Sequelize.ENUM,
    values: ['ADMIN', 'CUSTOMER'],
    defaultValue: 'CUSTOMER'
  }
})

Promise.all([Product.sync(), Order.sync(), OrderMore.sync(), Topic.sync(), User.sync()]).then(() => {
  console.log('All tables have synced!')
})
