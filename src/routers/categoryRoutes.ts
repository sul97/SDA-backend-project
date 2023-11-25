import express from 'express'

import {
    createCategory,
    getAllCategories,
    getOneCategoryById,
    updateOneCategoryId,
    getOneCategoryBySlug,
    updateOneCategoryBySulg,
    deleteOneCategoryById,
    deleteOneCategoryBySlug
} from '../controllers/categoryControllers'
const categoryRouter = express.Router()

categoryRouter.get('/', getAllCategories)
//categoryRouter.get('/:id', getOneCategoryById)
categoryRouter.get('/:slug', getOneCategoryBySlug)
categoryRouter.post('/', createCategory)
//categoryRouter.delete('/:id', deleteOneCategoryById)
categoryRouter.delete('/:slug', deleteOneCategoryBySlug)
//categoryRouter.put('/:id', updateOneCategoryId)
categoryRouter.put('/:slug', updateOneCategoryBySulg)

export default categoryRouter