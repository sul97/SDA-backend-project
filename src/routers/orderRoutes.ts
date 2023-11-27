import { Router } from 'express'

import {
  createSingleOrder,
  deleteSingleOrderById,
  getAllOrders,
  getSingleOrderById,
  updateSingleOrderById,
} from '../controllers/orderControllers'

const orderRoutes = Router()

orderRoutes.get('/', getAllOrders)
orderRoutes.post('/', createSingleOrder)
orderRoutes.get('/:id', getSingleOrderById)
orderRoutes.put('/:id', updateSingleOrderById)
orderRoutes.delete('/:id', deleteSingleOrderById)

export default orderRoutes
