import { Order } from '../models/orderSchema'
import { OrdersInput } from '../types'
import { createHttpError } from '../util/createHTTPError'

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

export const findOrderById = async (id: string): Promise<OrdersInput> => {
    const order = await Order.findById(id)
    if (!order) {
      const error = createHttpError(404, 'Order not found')
      throw error
    }
    return order
  }

  export const updateOrderById = async (
    id: string,
    order: OrdersInput
  ): Promise<OrdersInput> => {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true })
    if (!updatedOrder) {
      const error = createHttpError(404, 'Category not found')
      throw error
    }
    return updatedOrder
  }

export const deleteOrderById = async (id: string) => {
  const order = await Order.findByIdAndDelete(id)
  if (!order) {
    const error = createHttpError(404, 'Order not found')
    throw error
  }
  return order
}
