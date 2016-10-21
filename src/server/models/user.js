import {User} from './db'
import UUID from 'node-uuid'

const getUserById = async (id) => {
  await User.findById(id)
}

const getUserByName = async (name) => {
  await User.findOne({ where: {name: name} })
}

const createUser = async (name, password, avater='', phone='', email='', addr='') => {
  await User.create({
    name: name,
    password: password,
    avater: avater,
    phone: phone,
    email: email,
    addr: addr,
    token: UUID.v4()
  })
}

const updateUser = async (id, password, avater, phone, email, addr) => {
  await User.update({
    password: password,
    avater: avater,
    phone: phone,
    email: email,
    addr: addr
  }, {
    where : {id: id}
  })
}

export default {
  getUserById,
  getUserByName,
  createUser,
  updateUser
}