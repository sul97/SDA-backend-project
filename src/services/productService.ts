import slugify from 'slugify'

import { Product } from '../models/productSchema'
import { createHttpError } from '../util/createHTTPError'
import { ProductsInput, ProductsType } from '../types/productTypes'

import {
  deleteFromCloudinary,
  uploadToCloudinary,
  valueWithoutExtension,
} from '../helper/cloudinaryHelper'

export const findAllProducts = async (page = 1, limit = 3, search = '') => {
  const count = await Product.countDocuments()
  const totalPage = Math.ceil(count / limit)
  const searchRegExp = new RegExp('.*' + search + '.*', 'i')
  const filter = {
    $or: [{ title: { $regex: searchRegExp } }, { description: { $regex: searchRegExp } }],
    $and: [{ price: { $gt: 2000 } }, { price: { $lt: 3000 } }],
  }
  if (page > totalPage) {
    page = totalPage
  }

  const skip = (page - 1) * limit
  const products: ProductsType[] = await Product.find(filter)
    .populate('category')
    .skip(skip)
    .limit(limit)
    .sort({ price: 1 })
  return { products, count, totalPage, currentPage: page }
}

export const findProductsBySlug = async (slug: string): Promise<ProductsInput> => {
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    const error = createHttpError(404, 'product not found')
    throw error
  }
  return product
}
export const createProduct = async (product: ProductsInput, image: string | undefined) => {
  const { title } = product
  const productExist = await Product.exists({ title: title })
  if (productExist) {
    throw new Error('product already exist with this title')
  }
  const newProduct = new Product({
    title: product.title,
    slug: slugify(title),
    image: image,
    price: product.price,
    category: product.category,
    description: product.description,
    quantity: product.quantity,
    sold: product.sold,
    shipping: product.shipping,
  })

  await newProduct.save()
  return newProduct
}
export const updateProduct = async (
  slug: string,
  updatedProductData: ProductsInput,
  image: string | undefined
): Promise<ProductsInput> => {
     
// const updates: Record<string, unknown> = {}
  if (updatedProductData.title) {
    updatedProductData.slug = slugify(updatedProductData.title)
  }

  if (image) {
    updatedProductData.image = image
  }
  console.log(updatedProductData.image)

  console.log(image)

  const updatedproduct = await Product.findOneAndUpdate({ slug: slug }, updatedProductData, {
    new: true,
    runValidators: true,
  })

  if (!updatedproduct) {
    const error = createHttpError(404, 'Product not found')
    throw error
  }

  return updatedproduct
}

export const deleteProduct = async (slug: string) => {
  const productExist = await Product.findOne({ slug: slug })
  if (!productExist) {
    throw createHttpError(404, 'Product not found')
  }
  if (productExist && productExist.image) {
    const publicId = await valueWithoutExtension(productExist.image)
    await deleteFromCloudinary(`product_image/${publicId}`)
  }
  await Product.findOneAndDelete({ slug: slug })
}
