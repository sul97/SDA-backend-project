import { Router } from 'express'

import {
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  createSingleProduct,
  updateSingleProduct,
} from '../controllers/productControllers'

import { createProductValidation, updateProductValidation } from '../validation/productValidation'

import { runValidation } from '../validation/runValidation'

const productRoutes = Router()

productRoutes.get('/', getAllProducts)
productRoutes.post('/', createProductValidation, runValidation, createSingleProduct)
productRoutes.get('/:slug', getSingleProduct)
productRoutes.put('/:slug', updateProductValidation, runValidation, updateSingleProduct)
productRoutes.delete('/:slug', deleteSingleProduct)
export default productRoutes
