import { Document } from 'mongoose'

export interface ProductsType extends Document {
  _id: string
  title: string
  slug?: string
  price: number
  image: string
  category:CategoryType['_id']  
  description: String
  quantity: number
  sold: number
  shipping?: number
  createdAt: string
  updatedAt:string
  
}

export interface UsersType extends Document {
  _id: string
  firstName: string
  slug?: string
  lastName: string
  email: string
}

export interface CategoryType  extends Document {
    _id: string
    name: string
    slug?: string
    createdAt: string
    updatedAt:string

}

export interface Error {
  status?: number
  message?: string
}

export type CategoryInput = Omit<CategoryType,'_id'>;
export type ProductsInput = Omit<ProductsType, '_id'>
export type UsersInput = Omit<UsersType, '_id'>

