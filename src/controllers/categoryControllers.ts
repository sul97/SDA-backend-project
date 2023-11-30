import { Request, NextFunction, Response } from 'express'
import slugify from 'slugify'

import { Category } from '../models/categorySchema'
import { CategoryInput } from '../types'
import { createHttpError } from '../util/createHTTPError'
import {
  createNewCategory,
  deleteCategoryById,
  deleteCategoryBySlug,
  findCategories,
  findCtegoryById,
  findCtegoryBySlug,
  updateCategoryById,
  updateCategoryBySlug,
} from '../services/categoryService'
import mongoose from 'mongoose'

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page)
    const limit = Number(req.query.limit)
    const search = req.query.search as string
    const { categories, totalPage, currentPage } = await findCategories(page, limit, search)
    res.status(200).json({
      massege: 'return all Categorie ',
      payload: categories,
      totalPage,
      currentPage,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    console.log(id)
    const category = await findCtegoryById(id)
    res.status(200).json({
      massege: 'return single Category',
      payload: category,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const getSingleCategoryBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await findCtegoryBySlug(slug)
    res.status(200).json({
      massege: 'return single Category',
      payload: category,
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

export const updateSingleategoryId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const updatedCategory: CategoryInput = req.body
    const updated = await updateCategoryById(id, updatedCategory)
    res.status(200).json({
      massege: 'The category has been updated successfully ',
      payload: updated,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const updateSingleCategoryBySulg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const updatedCategory: CategoryInput = req.body
    const updated = await updateCategoryBySlug(slug, updatedCategory)
    res.status(200).json({
      massege: 'The category has been updated successfully ',
      payload: updated,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleeCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await deleteCategoryById(id)
    res.status(200).json({
      massege: 'The category has been deleted successfully',
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const deleteSingleCategoryBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    await deleteCategoryBySlug(slug)
    res.status(200).json({
      massege: 'The category has been deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
