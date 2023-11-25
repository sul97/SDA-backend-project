import slugify from 'slugify'

import { Product } from '../models/productSchema'
import { createHttpError } from '../util/createHTTPError'
import { ProductsInput } from '../types'


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
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    //create http error //status 404
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}
export const createProduct = async (product: ProductsInput, image: string | undefined) => {
  const {title}=product
  const productExist = await Product.exists({ title: title })
    if (productExist) {
      throw new Error('product already exist with this title')
    }
    const newProduct = new Product({
      title: product.title,
      slug: slugify(title),
      image: image,
      price :product.price,
      category:product.category,
      description:product.description,
      quantity: product.quantity,
      sold: product.sold,
      shipping: product.shipping,
    })
    await newProduct.save()
    return newProduct
}

export const updateProduct = async (slug: string, updatedProductDate: ProductsInput):Promise<ProductsInput> => {
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

