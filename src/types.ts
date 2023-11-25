import { Document } from 'mongoose'

export interface ProductsType extends Document {
  _id: string
  title: string
  slug?: string
  price: number
  image: string
  category: CategoryType['_id']
  description: String
  quantity: number
  sold: number
  shipping?: number
  createdAt: string
  updatedAt: string
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
  createdAt: string
  updatedAt: string
}

export interface OrdersType extends Document {
  _id: string
  product: ProductsType['_id']
  user: UsersType['_id']
  purchasedAt: string
  createdAt: string
  updatedAt: string
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
export type OrdersInput = Omit<OrdersType, '_id'>
