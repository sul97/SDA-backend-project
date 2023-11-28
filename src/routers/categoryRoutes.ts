import express from 'express'

import {
  createCategory,
  deleteSingleCategoryBySlug,
  deleteSingleeCategoryById,
  getAllCategories,
  getSingleCategoryById,
  getSingleCategoryBySlug,
  updateSingleCategoryBySulg,
  updateSingleategoryId,
} from '../controllers/categoryControllers'
import { createCategoryValidation  } from '../validation/categoryVlidation'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const categoryRoutes = express.Router()

categoryRoutes.get('/', isLoggedIn, isAdmin, getAllCategories)
categoryRoutes.get('/:id', getSingleCategoryById)
categoryRoutes.get('/:slug', getSingleCategoryBySlug)
categoryRoutes.post(
  '/',
  isLoggedIn,
  isAdmin,
  createCategoryValidation,
  runValidation,
  createCategory
)
categoryRoutes.delete('/:id', isLoggedIn, isAdmin, deleteSingleeCategoryById)
categoryRoutes.delete('/:slug', isLoggedIn, isAdmin, deleteSingleCategoryBySlug)
categoryRoutes.put('/:id', isLoggedIn, isAdmin, updateSingleategoryId)
categoryRoutes.put(
  '/:slug',
  isLoggedIn,
  isAdmin,
  createCategoryValidation,
  runValidation,
  updateSingleCategoryBySulg
)


export default categoryRoutes
