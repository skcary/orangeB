import {Goods} from './db'
import config from '../../config'

const createGoods = async (title, thumb, desc, content, owner, price, priceoff, sellstart = new Date(), sellend = new Date(), createtime = new Date()) => {
  await Goods.create({
    title,
    thumb,
    desc,
    content,
    owner,
    price,
    priceoff,
    sellstart,
    sellend,
    createtime
  })
}

const updateGoods = async (id, title, thumb, desc, content, owner, price, priceoff, sellstart = new Date(), sellend = new Date()) => {
  await Goods.update({
    title,
    thumb,
    desc,
    content,
    owner,
    price,
    priceoff,
    sellstart,
    sellend
  }, {
    where: {
      id
    }
  })
}

const findGoodsById = async (id) => {
  await Goods.findById(id)
}

const findGoodsByPage = async (page) => {
  let limit = config.goodsPageCount
  await Goods.findAndCountAll({
    where: {}, // later: 去掉下架的商品
    attributes: ['id', 'title', 'thumb', 'desc', 'owner', 'price', 'priceoff'],
    offset: (page - 1) * limit,
    limit: limit,
    Goods: [['createtime', 'DESC']]
  })
}

const delGoodsById = async (id) => {
  await Goods.destroy({ id })
}

export default {
  createGoods,
  updateGoods,
  findGoodsById,
  findGoodsByPage,
  delGoodsById
}
