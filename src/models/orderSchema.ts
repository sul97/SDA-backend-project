import mongoose, { Schema, model } from 'mongoose'

import { OrdersType } from '../types'

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        guantity: { type: Number, required: true },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    payment: {type:Object, required:true},
    status: {
      type: String,
      enum: [
        'Not Proccess' , 'Proccessing' , 'shipped' , 'Delivered' , 'Cancelled',
      ],
      defaul: 'Not Proccess'
    },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
)

export const Order = model<OrdersType>('orders', orderSchema)
