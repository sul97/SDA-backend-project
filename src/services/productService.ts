import { Product } from '../models/productSchema'
import { Request, Response, NextFunction } from 'express'
import { createHttpError } from '../util/createHTTPError'
import { ProductsInput } from '../types'
import slugify from 'slugify'

export const findAllProducts = async (page = 1, limit = 3) => {
  const count = await Product.countDocuments()
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const products = await Product.find({
    $and: [{ price: { $gt: 2000 } }, { price: { $lt: 3000 } }],
  })
    .populate('category')
    .skip(skip)
    .limit(limit)
    .sort({ price:1 })
  return { products, totalPage, currentPage: page }
}

export const findProductsBySlug = async (slug: string): Promise<ProductsInput> => {
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    //create http error //status 404
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}

export const updateProduct = async (slug: string, updatedProductDate: ProductsInput): Promise<ProductsInput> => {
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

export const deleteProduct = async (slug: string):Promise<ProductsInput> => {
  const product = await Product.findOneAndDelete({ slug: slug })
  if (!product) {
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}
