import { Request, NextFunction, Response } from 'express'
import slugify from 'slugify'

import { Category } from '../models/categorySchema'
import { CategoryInput } from '../types'
import { createHttpError } from '../util/createHTTPError'
import {

    createNewCategory,
    deleteCategoryById,
    deleteCategoryBySlug,
    findCtegories,
    findCtegoryById,
    findCtegoryBySlug,
    updateCategoryById,
    updateCategoryBySlug
} from "../services/categoryService"


export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let page = Number(req.query.page)||1
        const limit = Number(req.query.limit)||3
        const {categories ,totalPage, currentPage } = await findCtegories(page, limit)
        res.status(200).json({
            massege: 'Get All Categories ',
            payload: categories,
            totalPage,
            currentPage,
   })

  } catch (error) {
    next(error)
  }
}
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    console.log(name)
    await createNewCategory(name)
    res.status(201).json({
      message: 'The category has been created successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const getOneCategoryById = async (req: Request, res: Response, next: NextFunction) => {

    try {
         
        const id = req.params.id;
        console.log(id)
        const category = await findCtegoryById(id);
        res.status(200).json({
            massege: 'Get Category',
            payload: category
        })
    } catch (error) {
        next(error)
    }
};
export const getOneCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug =req.params.slug
        const category = await findCtegoryBySlug(slug)
        //console.log(category)
        res.status(200).json({
            massege: 'Get Category',
            payload: category
        })
    } catch (error) {
        next(error)
    }
};
export const deleteOneCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deleteCategoryById(id);
        res.status(200).json({
            massege: 'The category has been deleted successfully',
        })
    } catch (error) {
        next(error)
    }
}
export const deleteOneCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slug = req.params.slug;
        await deleteCategoryBySlug(slug);
        res.status(200).json({
            massege: 'The category has been deleted successfully',
        })
    } catch (error) {
        next(error)
    }
};
export const updateOneCategoryId = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const id = req.params.id;
        const updatedCategory: CategoryInput = req.body;
        const updated = await updateCategoryById(id, updatedCategory);
    res.status(200).json({
      massege: 'The category has been updated successfully ',
      payload: updated,
    })
  } catch (error) {
    next(error)
  }
}
export const updateOneCategoryBySulg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const slug = req.params.slug
    console.log(slug)
    const updatedCategory: CategoryInput = req.body
    console.log(updatedCategory)
    const updated = await updateCategoryBySlug(slug, updatedCategory)
    res.status(200).json({
      massege: 'The category has been updated successfully ',
      payload: updated,
    })
  } catch (error) {
    next(error)
  }
}
