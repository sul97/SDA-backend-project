import slugify from 'slugify'

import { Category } from '../models/categorySchema'
import { createHttpError } from '../util/createHTTPError'
import {  CategoryInput, CategoryType } from '../types'

export const findCtegories = async (page = 1, limit = 3) => {

    const count = await Category.countDocuments()
    const totalPage = Math.ceil(count / limit)
    if (page > totalPage) {
    page = totalPage
    }
     const skip = (page - 1) * limit

    const categories = await Category.find().skip(skip).limit(limit)
    return {categories,totalPage, currentPage: page }
}
export const findCtegoryById = async (id:string):Promise<CategoryInput>  => {
    const category = await Category.findById(id);
    if (!category) {
        const error = createHttpError(404, 'Category not found')
    throw error
    }
    return category
}
export const findCtegoryBySlug = async (slug: string):Promise<CategoryInput> => {
    const category = await Category.findOne({ slug: slug })
    if (!category) {
        const error = createHttpError(404, 'Category not found')
        throw error
  }
    return category
}

export const updateCategoryById = async (id: string, updatedCategoryDate: CategoryInput):Promise<CategoryInput> => {
      if (updatedCategoryDate.name) {
            updatedCategoryDate.slug = slugify(updatedCategoryDate.name)
    }
    const updatedCategory = await Category.findByIdAndUpdate(id, updatedCategoryDate, { new: true });
    if (!updatedCategory) {
        const error = createHttpError(404, 'Category not found')
        throw error
    }
    return updatedCategory
    
}
export const updateCategoryBySlug = async (slug: string, updatedCategoryDate: CategoryInput):Promise<CategoryInput> => {
    if (updatedCategoryDate.name) {
            updatedCategoryDate.slug = slugify(updatedCategoryDate.name)
    }
    console.log(updatedCategoryDate)
    const updatedCategory = await Category.findOneAndUpdate({ slug: slug }, updatedCategoryDate, { new: true });
    console.log(updatedCategory)
    if (!updatedCategory) {
        const error = createHttpError(404, 'Category not found')
        throw error
    }
    return updatedCategory
    
}

export const deleteCategoryById = async (id: string) => {
    const category = await Category.findByIdAndDelete(id)
    if (!category) {
        const error = createHttpError(404, 'Category not found')
        throw error
    }
    return category
    
}
export const deleteCategoryBySlug = async (slug: string) => {
    const category = await Category.findOneAndDelete({ slug: slug })
    if (!category) {
        const error = createHttpError(404, 'Category not found')
        throw error
    }
    return category
    
}
export const createNewCategory = async (name: string) => {
    const categoryExist = await Category.exists({ name:name })
    if (categoryExist) {
        const error = createHttpError(409, 'Category already exists with this name')
        throw error;
    }
    const newCategory = new Category({
        name,
        slug: slugify(name),
    });

    await newCategory.save()
}
