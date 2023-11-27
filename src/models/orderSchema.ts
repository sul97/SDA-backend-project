import mongoose, { Schema, model } from 'mongoose'

import { OrdersType } from '../types'

const orderSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    product: [{
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    }],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
)

export const Order = model<OrdersType>('orders', orderSchema)
