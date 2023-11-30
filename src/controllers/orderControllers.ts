import { NextFunction, Request, Response } from 'express'

import {
  createOrder,
  deleteOrderById,
  findAllOrders,
  findOrderById,
  updateOrderById,
} from '../services/orderService'
import { OrdersInput } from '../types/orderTypes'

export const handleProcessPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cartItems, payment } = req.body
    res.send({
      message: 'payment was successful and order was created',
    })
  } catch (error) {
    next(error)
  }
}

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const { orders, totalPage, currentPage } = await findAllOrders(page, limit)
    res.send({
      message: 'return all orders',
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

export const getSingleOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const order = await findOrderById(id)
    res.status(200).json({
      massege: 'return single Order',
      payload: order,
    })
  } catch (error) {
    next(error)
  }
}
//place an order
export const createSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {

    res.status(201).send({
      message: 'The order has been created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const updatedOrder: OrdersInput = req.body
    const order = await updateOrderById(id, updatedOrder)
    res.status(200).json({
      massege: 'The Order has been updated successfully',
      payload: order,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    await deleteOrderById(id)
    res.status(200).json({
      massege: 'The Order has been deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
