import slugify from 'slugify'
import User from '../models/userSchema'
import { UsersInput } from '../types'

export const findAllUsers = async (page = 1, limit = 3) => {
  const count = await User.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const users = await User.find().skip(skip).limit(limit).sort({ name: 1 })
  return { users, totalPage, currentPage: page }
}
