import { Document } from 'mongoose'
import { ProductsType } from './productTypes'
import { IUsers } from './userTypes'

export interface OrdersType extends Document {
  products: OrderProducts[]
  payment: OrderProducts
  user: IUsers['_id']
  status: 'Not Proccess' | 'Proccessing' | 'shipped' | 'Delivered' | 'Cancelled'
}

export interface OrderProducts {
  product: ProductsType['_id']
  quantity: number
}

export interface OrderPayment {}
