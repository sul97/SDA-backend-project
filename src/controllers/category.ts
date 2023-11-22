import { Request, NextFunction, Response } from "express"
import slugify from "slugify"

import { Category } from "../models/categorySchema";
import { CategoryInput } from "../types";
import createHttpError from "http-errors";


export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find()

        
        res.json({
            massege: 'Get All Categories ',
            payload : categories
   })
  } catch (error) {
      next(error)
  }
}
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name }: CategoryInput = req.body
        const categoryExist = await Category.exists({ name: name })
        if (categoryExist) {
            const error = createHttpError(409, ' Category already exist with this nane')
            throw error
        }
        const newCategory = new Category({
            name,
            slaug:slugify(name),
        })
        await newCategory.save();
        res.status(201).json({
            massege: 'create new Category'
        })
    
    } catch (error) {
        next(error)
    }
    
}
export const getOneCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        //const product = await Product.find({ _id: id }); 
        const category = await Category.findById(id);

        res.json({
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
        await Category.findByIdAndDelete(id);
        res.json({
            massege: 'delet Category',
        })
    } catch (error) {
        next(error)
    }
};
export const updateOneCategory = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const id = req.params.id;
        const updatefCategory: CategoryInput = req.body;
        
        const updated = await Category.findByIdAndUpdate(id,updatefCategory, {new:true});
        if (!updated) {
            throw new Error('category is not found');
        };
        res.json({
            massege: 'update category',
        });
        
    } catch (error) {
        next(error);
    }
}

