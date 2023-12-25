import { NextFunction, Request, Response } from 'express'

import {
  createProduct,
  deleteProduct,
  findAllProducts,
  findProductsBySlug,
  updateProduct,
} from '../services/productService'
import { deleteImage } from '../helper/deleteImageHelper'
import { ProductsInput, ProductsType } from '../types/productTypes'
import {
  deleteFromCloudinary,
  uploadToCloudinary,
  valueWithoutExtension,
} from '../helper/cloudinaryHelper'
import { Product } from '../models/productSchema'
import slugify from 'slugify'
import { v2 as cloudinary } from 'cloudinary'
import { dev } from '../config'
import { createHttpError } from '../util/createHTTPError'

cloudinary.config({
  cloud_name: dev.cloud.cloudinaryName,
  api_key: dev.cloud.cloudinaryAPIkey,
  api_secret: dev.cloud.cloudinaryAPISecretkey,
})

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const search = req.query.search as string
    const { products, count, totalPage, currentPage } = await findAllProducts(page, limit, search)
    res.send({
      message: 'return all products',
      payload: {
        products,
        pagination: {
          totalProducts: count,
          totalPage,
          currentPage,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await findProductsBySlug(req.params.slug)
    res.send({
      message: 'return single product',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData = req.body
    let image = req.file && req.file?.path
    if (image) {
      const response = await uploadToCloudinary(image, 'product_image')
      image = response
    }
    const newProduct = await createProduct(productData, image)
    res.status(201).send({
      message: ' The Product has been created successfully',
      payload: newProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const updateProductData: ProductsInput = req.body

    let image = req.file && req.file?.path
    if (image) {
      const response = await uploadToCloudinary(image, 'product_image')
      image = response
    }
    const updatedProduct = await updateProduct(slug, updateProductData, image)
    if (updateProductData.image) {
      const publicId = await valueWithoutExtension(updateProductData.image)
      await deleteFromCloudinary(`product_image/${publicId}`)
    }
    res.status(200).send({
      message: 'The Product has been updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleProductByslug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const product = await Product.findOne({ slug: slug })
    if (!product) {
      throw createHttpError(404, 'Product not found')
    }

    const allowedFields = [
      'title',
      'description',
      'price',
      'sold',
      'category',
      'quantity',
      'shipping',
      'image',
    ]
    const updates: Record<string, unknown> = {}
    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        if (key === 'title') {
          updates[key] = req.body.title
          updates.slug = slugify(req.body.title)
        } else {
          updates[key] = req.body[key]
        }
      }
    }
    const image = req.file && req.file?.path
    if (image) {
      const response = await uploadToCloudinary(image, 'product_image')
      updates.image = response
    }
    const updatedProduct = await Product.findOneAndUpdate({ slug: slug }, updates, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    if (!updatedProduct) {
      throw createHttpError(404, 'Product not updated')
    }
    if (product.image) {
      const publicId = await valueWithoutExtension(product.image)
      await deleteFromCloudinary(`product_image/${publicId}`)
    }
    res.status(200).send({
      message: 'The Product has been updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteProduct(req.params.slug)
    res.status(200).send({
      message: ' The product is deleted successfully ',
    })
  } catch (error) {
    next(error)
  }
}
