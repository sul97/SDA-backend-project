import express from 'express'

import {
  createCategory,
  getAllCategories,
  getOneCategoryBySlug,
  updateOneCategoryBySulg,
  deleteOneCategoryBySlug,
} from '../controllers/categoryControllers'
const categoryRoutes = express.Router()

categoryRoutes.get('/', getAllCategories)
//categoryRouter.get('/:id', getOneCategoryById)
categoryRoutes.get('/:slug', getOneCategoryBySlug)
categoryRoutes.post('/', createCategory)
//categoryRouter.delete('/:id', deleteOneCategoryById)
categoryRoutes.delete('/:slug', deleteOneCategoryBySlug)
//categoryRouter.put('/:id', updateOneCategoryId)
categoryRoutes.put('/:slug', updateOneCategoryBySulg)

export default categoryRoutes
