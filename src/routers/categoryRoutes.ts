import express from 'express'

import {
    createCategory,
    deleteOneCategory,
    getAllCategories,
    getOneCategoryById,
    updateOneCategoryId,
    getOneCategoryBySlug,
    updateOneCategoryBySulg
} from '../controllers/categoryControllers'
const categoryRouter = express.Router()

categoryRouter.get('/', getAllCategories);
categoryRouter.get('/:slug', getOneCategoryBySlug)
categoryRouter.get('/:id', getOneCategoryById)
categoryRouter.post('/', createCategory);
categoryRouter.delete('/:id', deleteOneCategory)
categoryRouter.put('/:id', updateOneCategoryId)
categoryRouter.put('/:slug', updateOneCategoryBySulg)

export default categoryRouter