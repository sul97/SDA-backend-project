import { Document } from 'mongoose'

export interface CategoryType extends Document {
  _id: string
  name: string
  slug?: string
  createdAt: NativeDate
  updatedAt: NativeDate
}

export type CategoryInput = Omit<CategoryType, '_id'>
