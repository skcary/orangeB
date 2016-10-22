import {Product} from './db'
import config from '../../config'

const createProduct = async (title, thumb, desc, content, owner, price, priceoff, sellstart = new Date(), sellend = new Date(), createtime = new Date()) => {
  await Product.create({
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

const updateProduct = async (id, title, thumb, desc, content, owner, price, priceoff, sellstart = new Date(), sellend = new Date()) => {
  await Product.update({
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

const findProductById = async (id) => {
  await Product.findById(id)
}

const findProductByPage = async (page) => {
  let limit = config.productPageCount
  await Product.findAndCountAll({
    where: {}, // later: 去掉下架的商品
    attributes: ['id', 'title', 'thumb', 'desc', 'owner', 'price', 'priceoff'],
    offset: (page - 1) * limit,
    limit: limit,
    Product: [['createtime', 'DESC']]
  })
}

const delProductById = async (id) => {
  await Product.destroy({ id })
}

export default {
  createProduct,
  updateProduct,
  findProductById,
  findProductByPage,
  delProductById
}
