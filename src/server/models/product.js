import {Product} from './db'
import config from '../../config'

const createProduct = async (title, thumb, desc, content, owner, price, priceoff, sellstart=new Date(), sellend=new Date(), createtime=new Date()) => {
  await Product.create({
    title: title,
    thumb: thumb,
    desc: desc,
    content: content,
    owner: owner,
    price: price,
    priceoff: priceoff,
    sellstart: sellstart,
    sellend: sellend,
    createtime: createtime
  })
}

const updateProduct = async (id, title, thumb, desc, content, owner, price, priceoff, sellstart=new Date(), sellend=new Date()) => {
  await Product.update({
    title: title,
    thumb: thumb,
    desc: desc,
    content: content,
    owner: owner,
    price: price,
    priceoff: priceoff,
    sellstart: sellstart,
    sellend: sellend
  }, {
    where: { id: id }
  })
}

const findProductById = async (id) => {
  await Product.findById(id)
}

const findProductByPage = async (page) => {
  let limit = config.productPageCount
  await Product.findAndCountAll({
     where: {}, //later: 去掉下架的商品
     attributes: ['id', 'title', 'thumb', 'desc', 'owner', 'price', 'priceoff'],
     offset: (page - 1) * limit,
     limit: limit,
     Product: [['createtime', 'DESC']]
  })
}

const delProductById = async (id) => {
  await Product.destroy({id: id})
}

export default {
  createProduct,
  updateProduct,
  findProductById,
  findProductByPage,
  delProductById
}