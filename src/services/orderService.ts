import { Order } from '../models/orderSchema'
import { OrdersInput } from '../types'

export const findAllOrders = async (page = 1, limit = 3) => {
  const count = await Order.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const orders = await Order.find().populate('product').populate('user').skip(skip).limit(limit)

  return { orders, totalPage, currentPage: page }
}

export const createOrder = async (order: OrdersInput) => {
  const { product, user } = order

  const newOrder: OrdersInput = new Order({
    product: product,
    user: user,
  })
  await newOrder.save()
  return newOrder
}
