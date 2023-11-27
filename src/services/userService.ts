import bcrypt from 'bcrypt'

import { handleSendEmail } from '../helper/sendEmail'
import { IUsers, UserType, UsersInput } from '../types'
import { createHttpError } from '../util/createHTTPError'

import User from '../models/userSchema'
import { generateJwtToken } from '../util/generateJwtToken'

export const processRegisterUserService = async (
  name: string,
  email: string,
  password: string,
  address: string,
  phone: string,
  imagePath: string | undefined,
  isAdmin: boolean
): Promise<string> => {
  const isUserExists = await User.exists({ email })

  if (isUserExists) {
    throw createHttpError(409, 'User already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const tokenPayload: UserType = {
    name: name,
    email: email,
    password: hashedPassword,
    address: address,
    phone: phone,
    isAdmin: isAdmin,
  }

  if (imagePath) {
    tokenPayload.image = imagePath
  }

  const token = generateJwtToken(tokenPayload)

  //send email hear => token inside the email
  const emailData = {
    email: email,
    subjeect: 'Activate Your Account',
    html: `<h1>Hello ${name}</h1>
      <p>Please activate your account by : <a href="http://localhost:5050/users/activate/${token}">click the following link</a></p>`,
  }
  //send email
  await handleSendEmail(emailData)

  return token
}

export const findAllUsers = async (page = 1, limit = 3, search = '') => {
  const count = await User.countDocuments()
  const totalPage = Math.ceil(count / limit)

  const searchRegExp = new RegExp('.*' + search + '.*')
  const filter = {
    isAdmin: { $ne: true }, //return only user
    $or: [
      { name: { $regex: searchRegExp } },
      { email: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
    ],
  }
  const options = { password: 0, __v: 0 }

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const users: IUsers[] = await User.find(filter, options)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1, name: 1 })
  return { users, totalPage, currentPage: page }
}

export const findUserById = async (id: string): Promise<IUsers> => {
  const options = { password: 0, __v: 0 }
  const user = await User.findById(id, options)
  if (!user) {
    //create http error //status 404
    const error = createHttpError(404, 'User not found')
    throw error
  }
  return user
}

export const banUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isBanned: true })
  if (!user) {
    //create http error //status 404
    const error = createHttpError(404, 'User not found')
    throw error
  }
}

export const unbanUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate(id, { isBanned: false })
  if (!user) {
    //create http error //status 404
    const error = createHttpError(404, 'User not found')
    throw error
  }
}

export const updateUser = async (
  id: string,
  updatedUserData: UsersInput,
  image: string | undefined
): Promise<UsersInput> => {
  if (updatedUserData.id) {
    updatedUserData.id = updatedUserData.id
  }

  if (image) {
    updatedUserData.image = image
  }

  const updateduser = await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
  })

  if (!updateduser) {
    const error = createHttpError(404, 'User not found')
    throw error
  }

  return updateduser
}

export const deleteUser = async (id: string): Promise<UsersInput> => {
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    const error = createHttpError(404, 'User not found')
    throw error
  }
  return user
}
