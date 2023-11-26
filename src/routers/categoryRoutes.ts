import express from 'express'

import {
  createCategory,
  deleteSingleCategoryBySlug,
  deleteSingleeCategoryById,
  getAllCategories,
  getSingleCategoryById,
  getSingleCategoryBySlug,
  updateSingleCategoryBySulg,
  updateSingleategoryId
} from '../controllers/categoryControllers'
const categoryRoutes = express.Router()

categoryRoutes.get('/', getAllCategories)
//categoryRoutes.get('/:id', getSingleCategoryById)
categoryRoutes.get('/:slug', getSingleCategoryBySlug)
categoryRoutes.post('/', createCategory)
//categoryRoutes.delete('/:id', deleteSingleeCategoryById)
categoryRoutes.delete('/:slug', deleteSingleCategoryBySlug)
//categoryRoutes.put('/:id', updateSingleategoryId)
categoryRoutes.put('/:slug', updateSingleCategoryBySulg)

export default categoryRoutes
