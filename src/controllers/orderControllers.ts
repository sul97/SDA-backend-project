import { NextFunction, Request, Response } from 'express'
import { Order } from '../models/orderSchema'
import { OrdersInput } from '../types'
import { createOrder, findAllOrders } from '../services/orderService'

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const { orders, totalPage, currentPage } = await findAllOrders(page, limit)
    res.send({
      message: 'get all orders',
      payload: {
        orders,
        totalPage,
        currentPage: page,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body
    const newOrder = await createOrder(orderData)
    res.status(201).send({
      message: 'order is created',
      payload: newOrder,
    })
  } catch (error) {
    next(error)
  }
}
