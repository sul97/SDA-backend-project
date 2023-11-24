import slugify from 'slugify'

import { Category } from '../models/categorySchema'
import { createHttpError } from '../util/createHTTPError'
import { CategoryInput } from '../types'

export const findACtegories = async () => {
    const categories = await Category.find()
    return categories
}
export const findACtegoryById = async (id:string) => {
    const category = await Category.findById(id);
    if (!category) {
        const error = createHttpError(404, 'Category not found')
    throw error
    }
    return category
}
export const findACtegoryBySlug = async (slug: string) => {
    const category = await Category.find({ slug: slug })
    if (category.length === 0) {
        const error = createHttpError(404, 'Category not found')
        throw error
  }
    return category
}

export const updateCategoryById = async (id: string, updatedCategoryDate: CategoryInput) => {
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
export const updateCategoryBySlug = async (slug: string, updatedCategoryDate: CategoryInput) => {
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

export const deleteCategory = async (id: string) => {
    const category = await Category.findByIdAndDelete(id)
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
