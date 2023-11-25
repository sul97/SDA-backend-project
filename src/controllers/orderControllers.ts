import { NextFunction, Request, Response } from 'express'
import { Order } from '../models/orderSchema'
import { OrdersInput } from '../types'

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const skip = (page - 1) * limit
    const orders = await Order.find().skip(skip).limit(limit)
    const count = await Order.countDocuments()
    const totalPage = Math.ceil(count / limit)

    if (page > totalPage) {
      page = totalPage
    }

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

export const createSingleOrder= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product, user } = req.body
    console.log(req.body)
    const newOrder : OrdersInput = new Order({
      product: product,
      user: user,
    })
    await newOrder.save()
    res.status(201).send({
      message: 'order is created',
      payload: newOrder,
    })
  } catch (error) {
    next(error)
  }
}
