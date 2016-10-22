import {Topic} from './db'
import config from '../../config'

const createTopic = async (title, thumb, desc, content, author, tags = '', createtime = new Date()) => {
  await Topic.create({
    title,
    thumb,
    desc,
    author,
    tags,
    createtime,
    updatetime: createtime
  })
}

const updateTopic = async (id, title, thumb, desc, content, author, tags = '', updatetime = new Date()) => {
  await Topic.update({
    title,
    thumb,
    desc,
    author,
    tags,
    updatetime
  }, {
    where: {
      id
    }
  })
}

const findTopicById = async (id) => {
  await Topic.findById(id)
}

const findTopicByPage = async (page) => {
  let limit = config.topicPageCount
  await Topic.findAndCountAll({
    where: {},
    attributes: ['id', 'title', 'thumb', 'desc', 'author', 'updatetime'],
    offset: (page - 1) * limit,
    limit: limit,
    order: [['updatetime', 'DESC']]
  })
}

const delTopicById = async (id) => {
  await Topic.destroy({ id })
}

export default {
  createTopic,
  updateTopic,
  findTopicById,
  findTopicByPage,
  delTopicById
}
