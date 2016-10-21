import {Order, OrderMore} from './db'
import config from '../../config'

const createOrder = async (orderid, userid, totalprice, ordermorelist, createtime = new Date()) => {
  await Order.create({
    orderid: orderid,
    userid: userid,
    totalprice: totalprice,
    createtime: createtime
  })

  /*eslint-disable no-alert, no-console */
  ordermorelist.map((item) => {
    await OrderMore.create({
      orderid: orderid,
      productid: item.productid,
      count: item.count,
      unitprice: item.unitprice
    })
  })
  /*eslint-enable */
}

const updateOrderSatusById = async (id, status) => {
  await Order.update({
    status: status
  }, {
    where: { id: id }
  })
}

const findOrderById = async (id) => {
  await Order.findById(id)
}

const findOrderByPage = async (page) => {
  // select order table
  let limit = config.orderPageCount
  let orderlist = await Order.findAndCountAll({
    where: {},
    offset: (page - 1) * limit,
    limit: limit,
    order: [['createtime', 'DESC']]
  })

  // select ordermore table
  orderlist.map((item) => {
    item.ordermorelist = await OrderMore.findAll({
      where: {orderid: item.orderid}
    })
  })
  return orderlist
}

export default {
  createOrder,
  updateOrderSatusById,
  findOrderById,
  findOrderByPage
}
