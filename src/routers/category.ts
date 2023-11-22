import express from 'express'

import {
    createCategory,
    deleteOneCategory,
    getAllCategories,
    getOneCategory,
    updateOneCategory
} from '../controllers/category'
const categoryRouter = express.Router()

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/', createCategory);
categoryRouter.get('/', getOneCategory)
categoryRouter.get('/:id', getOneCategory)
categoryRouter.delete('/:id', deleteOneCategory)
categoryRouter.put('/:id', updateOneCategory)

export default categoryRouter