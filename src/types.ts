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

export interface IUsers extends Document {
  _id: string
  name: string
  email: string
  password: string
  image: string
  address: string
  phone: string
  isAdmin: boolean
  isBanned: boolean
  orders: OrdersType['_id']
  createdAt?: string
  updatedAt?: string
}

export interface CategoryType extends Document {
  _id: string
  name: string
  slug?: string
  createdAt: string
  updatedAt: string
}

export interface OrderProducts {
  product: ProductsType['_id']
  quantity: number
}

export interface OrderPayment {}
export interface OrdersType extends Document {
  products: OrderProducts[]
  payment: OrderProducts
  user: IUsers['_id']
  status: 'Not Proccess' | 'Proccessing' | 'shipped' | 'Delivered' | 'Cancelled'
}

export type EmailDataType = {
  email: string
  subjeect: string
  html: string
}

export type UserType = {
  name: string
  email: string
  password: string
  address: string
  phone: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
}

export interface Error {
  status?: number
  message?: string
}

export type CategoryInput = Omit<CategoryType, '_id'>
export type ProductsInput = Omit<ProductsType, '_id'>
export type UsersInput = Omit<IUsers, '_id'>
export type OrdersInput = Omit<OrdersType, '_id'>
