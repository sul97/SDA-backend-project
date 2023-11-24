import { Request, NextFunction, Response } from "express"
import slugify from "slugify"

import { Category } from "../models/categorySchema"
import { CategoryInput } from "../types"
import { createHttpError } from '../util/createHTTPError'
import {
    createNewCategory,
    deleteCategory,
    findACtegories,
    findACtegoryById,
    findACtegoryBySlug,
    updateCategoryById,
    updateCategoryBySlug
} from "../services/categoryService"


export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await findACtegories()
        res.status(200).json({
            massege: 'Get All Categories ',
            payload : categories
   })
  } catch (error) {
      next(error)
  }
}
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        console.log(name)
        await createNewCategory(name);
        res.status(201).json({
            message: 'The category has been created successfully',
        });
    } catch (error) {
        next(error)
    }
};

export const getOneCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const category = await findACtegoryById(id);

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
        const category = await findACtegoryBySlug(slug)
        //console.log(category)
        res.status(200).json({
            massege: 'Get Category',
            payload: category
        })
    } catch (error) {
        next(error)
    }
};
export const deleteOneCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        await deleteCategory(id);
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
            payload:updated

        });
        
    } catch (error) {
        next(error);
    }
}
export const updateOneCategoryBySulg = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const slug = req.params.slug
        console.log(slug)
        const updatedCategory: CategoryInput = req.body;
        console.log(updatedCategory)
        const updated = await updateCategoryBySlug(slug, updatedCategory); 
        res.status(200).json({
            massege: 'The category has been updated successfully ',
             payload:updated  
        });
        
    } catch (error) {
        next(error);
    }
}
