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
  _id: string
  firstName: string
  slug?: string
  lastName: string
  email: string
  password: number
  role: string
}

export interface Error {
  status?: number
  message?: string
}

export type ProductsInput = Omit<ProductsType, '_id'>
export type UsersInput = Omit<UsersType, '_id'>
