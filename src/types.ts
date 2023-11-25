import { Document } from 'mongoose'

export interface ProductsType extends Document {
  _id: string
  title: string
  slug?: string
  price: number
  description: String
  quantity: number
  sold: number
  shipping?: number
}

export interface UsersType extends Document {
  name: string
  email: string
  password: string
  image: string
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
}

export interface CategoryType extends Document {
  _id: string
  name: string
  slug?: string
}

export type EmailDataType = {
  email: string
  subjeect: string
  html: string
}
export interface Error {
  status?: number
  message?: string
}

export type CategoryInput = Omit<CategoryType, '_id'>
export type ProductsInput = Omit<ProductsType, '_id'>
export type UsersInput = Omit<UsersType, '_id'>
