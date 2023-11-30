import { Order } from '../models/orderSchema'
import { OrdersInput } from '../types/orderTypes'
import { createHttpError } from '../util/createHTTPError'

export const findAllOrders = async (page = 1, limit = 3) => {
  const count = await Order.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const orders: OrdersInput[] = await Order.find()
    .populate('products.product')
    .populate('user')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
  if (orders.length == 0) {
    throw createHttpError(404, 'There are no orders in database')
  }

  return { orders, totalPage, currentPage: page }
}

export const findOrderById = async (id: string): Promise<OrdersInput> => {
  const order = await Order.findById(id).populate('products.product').populate('user')
  if (!order) {
    const error = createHttpError(404, 'Order not found with this id: ${id}')
    throw error
  }
  return order
}

export const createOrder = async (order: OrdersInput) => {
  const { products, user } = order
  const userExist = await Order.exists({ user: user })
  if (userExist) {
    throw new Error('order already exist with this user')
  }
  const newOrder: OrdersInput = new Order({
    product: products,
    user: user,
  })
  await newOrder.save()
  return newOrder
}

export const updateOrderById = async (id: string, order: OrdersInput): Promise<OrdersInput> => {
  const updatedOrder = await Order.findByIdAndUpdate(id, order, { new: true })
  if (!updatedOrder) {
    const error = createHttpError(404, 'Order not found')
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
