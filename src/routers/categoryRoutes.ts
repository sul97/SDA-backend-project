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
import { createCategoryValidation , updateCategoryValidation } from '../validation/categoryVlidation'
import { runValidation } from '../validation/runValidation'

const categoryRoutes = express.Router()

categoryRoutes.get('/', getAllCategories)
categoryRoutes.get('/:id', getSingleCategoryById)
categoryRoutes.get('/:slug', getSingleCategoryBySlug)
categoryRoutes.post('/',createCategoryValidation, runValidation,createCategory)
categoryRoutes.delete('/:id', deleteSingleeCategoryById)
categoryRoutes.delete('/:slug', deleteSingleCategoryBySlug)
categoryRoutes.put('/:id', updateSingleategoryId)
categoryRoutes.put('/:slug',updateCategoryValidation,runValidation, updateSingleCategoryBySulg)

export default categoryRoutes
