import { Product } from '../models/productSchema'
import { Request, Response, NextFunction } from 'express'
import { createHttpError } from '../util/createHTTPError'
import { ProductsInput } from '../types'
import slugify from 'slugify'

export const findeAllProducts = async (page = 1, limit = 3) => {
  const count = await Product.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const products = await Product.find().populate('category').skip(skip).limit(limit)

  return { products, totalPage, currentPage: page }
}

export const findeProductsBySlug = async (slug: string) => {
  const product = await Product.find({ slug: slug })
  if (product.length === 0) {
    //create http error //status 404
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}

export const updateProduct = async (slug: string, updatedProductDate: ProductsInput) => {
  if (updatedProductDate.title) {
    updatedProductDate.slug = slugify(updatedProductDate.title)
  }
  const product = await Product.findOneAndUpdate({ slug: slug }, updatedProductDate, { new: true })
  if (!product) {
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}

export const deleteProduct = async (slug: string) => {
  const product = await Product.findOneAndDelete({ slug: slug })
  if (!product) {
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}
