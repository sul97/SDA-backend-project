import { Router } from 'express'
import {
  createSingleOrder,
  deleteSingleOrderById,
  getAllOrders,
  getSingleCategoryById,
  updateSingleOrderById,
} from '../controllers/orderControllers'

const orderRoutes = Router()

orderRoutes.get('/', getAllOrders)
orderRoutes.post('/', createSingleOrder)
orderRoutes.get('/:id', getSingleCategoryById)
orderRoutes.put('/:id', updateSingleOrderById)
orderRoutes.delete('/:id', deleteSingleOrderById)

export default orderRoutes
