import { NextFunction, Request, Response } from 'express'
import slugify from 'slugify'

import { Product } from '../models/productSchema'

import {
  deleteProduct,
  findeAllProducts,
  findeProductsBySlug,
  updateProduct,
} from '../services/productService'


export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page)
    const limit = Number(req.query.limit)

    const { products, totalPage, currentPage } = await findeAllProducts(page, limit)

    res.send({
      message: 'return all products',
      payload: {
        products,
        totalPage,
        currentPage,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, price, category, description, quantity, sold, shipping } = req.body
    const productExist = await Product.exists({ title: title })
    if (productExist) {
      throw new Error('product already exist with this title')
    }
    const newProduct = new Product({
      title: title,
      slug: title && slugify(title),
      price: price,
      category: category,
      description: description,
      quantity: quantity,
      sold: sold,
      shipping: shipping,
    })
    await newProduct.save()
    res.status(201).send({
      message: ' product is created ',
      payload: newProduct,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await findeProductsBySlug(req.params.slug)
    res.send({
      message: 'return single product',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await deleteProduct(req.params.slug)
    res.send({
      message: ' product is deleted ',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await updateProduct(req.params.slug, req.body)
    res.send({
      message: ' product is updated ',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}
