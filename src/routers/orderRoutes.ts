import { Router } from 'express'

import {
  createSingleOrder,
  deleteSingleOrderById,
  getAllOrders,
  getSingleOrderById,
  handleProcessPayment,
  updateSingleOrderById,
} from '../controllers/orderControllers'
import { isLoggedIn } from '../middlewares/auth'

const orderRoutes = Router()

orderRoutes.post('/process-payment', isLoggedIn, handleProcessPayment)

orderRoutes.get('/', getAllOrders)
orderRoutes.get('/:id', getSingleOrderById)
orderRoutes.post('/', createSingleOrder)
orderRoutes.put('/:id', updateSingleOrderById)
orderRoutes.delete('/:id', deleteSingleOrderById)

export default orderRoutes
