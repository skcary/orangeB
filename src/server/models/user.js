import {User} from './db'
import UUID from 'node-uuid'

const getUserById = async (id) => {
  await User.findById(id)
}

const getUserByName = async (name) => {
  await User.findOne({ where: { name } })
}

const createUser = async (name, password, nickname, avater = '', phone = '', email = '', addr = '') => {
  await User.create({
    name,
    password,
    nickname,
    avater,
    phone,
    email,
    addr,
    token: UUID.v4()
  })
}

const updateUser = async (id, password, nickname, avater, phone, email, addr) => {
  await User.update({
    password,
    nickname,
    avater,
    phone,
    email,
    addr
  }, {
    where: {
      id
    }
  })
}

export default {
  getUserById,
  getUserByName,
  createUser,
  updateUser
}
