import { Router } from 'express'

import {
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  createSingleProduct,
  updateSingleProduct,
  updateSingleProductByslug,
} from '../controllers/productControllers'

import { createProductValidation, updateProductValidation } from '../validation/productValidation'
import { uploadProductimage } from '../middlewares/uploadFile'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const productRoutes = Router()

productRoutes.get('/', getAllProducts)
productRoutes.get('/:slug', getSingleProduct)
productRoutes.post(
  '/',
  isLoggedIn,
  isAdmin,
  uploadProductimage.single('image'),
  createProductValidation,
  runValidation,
  createSingleProduct
)
productRoutes.put(
  '/:slug',
  isLoggedIn,
  isAdmin,
  uploadProductimage.single('image'),
  updateProductValidation,
  runValidation,
  updateSingleProductByslug
)
productRoutes.delete('/:slug', isLoggedIn, isAdmin, deleteSingleProduct)

export default productRoutes
