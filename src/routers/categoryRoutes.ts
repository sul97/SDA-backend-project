import express from 'express'

import {
  createCategory,
  deleteSingleCategoryBySlug,
  deleteSingleCategoryById,
  getAllCategories,
  getSingleCategoryById,
  getSingleCategoryBySlug,
  updateSingleCategoryBySulg,
  updateSingleCategoryId,
} from '../controllers/categoryControllers'
import { createCategoryValidation } from '../validation/categoryVlidation'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const categoryRoutes = express.Router()

// categoryRoutes.get('/', isLoggedIn, isAdmin, getAllCategories)
// categoryRoutes.get('/:id', getSingleCategoryById)
// categoryRoutes.get('/:slug', getSingleCategoryBySlug)
// categoryRoutes.post(
//   '/',
//   isLoggedIn,
//   isAdmin,
//   createCategoryValidation,
//   runValidation,
//   createCategory
// )
// categoryRoutes.put('/:id', isLoggedIn, isAdmin, updateSingleCategoryId)
// categoryRoutes.put(
//   '/:slug',
//   isLoggedIn,
//   isAdmin,
//   createCategoryValidation,
//   runValidation,
//   updateSingleCategoryBySulg
// )
// categoryRoutes.delete('/:id', isLoggedIn, isAdmin, deleteSingleCategoryById)
// categoryRoutes.delete('/:slug', isLoggedIn, isAdmin, deleteSingleCategoryBySlug)


categoryRoutes.get('/',  getAllCategories)
categoryRoutes.get('/:id', getSingleCategoryById)
categoryRoutes.get('/:slug', getSingleCategoryBySlug)
categoryRoutes.post(
  '/',
  createCategoryValidation,
  runValidation,
  createCategory
)
categoryRoutes.put('/:id',updateSingleCategoryId)
categoryRoutes.put(
  '/:slug',
  createCategoryValidation,
  runValidation,
  updateSingleCategoryBySulg
)
categoryRoutes.delete('/:id', deleteSingleCategoryById)
categoryRoutes.delete('/:slug', deleteSingleCategoryBySlug)
export default categoryRoutes
