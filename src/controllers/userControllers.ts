import { Request, Response, NextFunction } from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

import { createHttpError } from '../util/createHTTPError'
import { dev } from '../config'

import { UsersInput } from '../types'

import User from '../models/userSchema'
import {
  banUserById,
  deleteUser,
  findAllUsers,
  findUserById,
  processRegisterUserService,
  unbanUserById,
  updateUser,
} from '../services/userService'
import mongoose from 'mongoose'
import { deleteImage } from '../helper/deleteImageHelper'

export const processRegisterUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, address, phone, isAdmin } = req.body
    const imagePath = req.file?.path

    const token = await processRegisterUserService(
      name,
      email,
      password,
      address,
      phone,
      imagePath,
      isAdmin
    )

    res.status(200).json({
      message: 'Check your email to activate your account',
      token,
    })
  } catch (error) {
    next(error)
  }
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token

    if (!token) {
      throw createHttpError(400, 'please Provide a token')
    }

    const decoded = jwt.verify(token, dev.app.jwtUserActivationKey)

    if (!decoded) {
      throw createHttpError(401, 'Token is Invalid ')
    }
    await User.create(decoded)

    res.status(200).json({
      message: 'User registration successful',
    })
  } catch (error) {
    if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
      const errorMessage = error instanceof TokenExpiredError ? 'expired token' : 'Invalid token'
      next(createHttpError(401, errorMessage))
    } else {
      next(error)
    }
  }
}

export const banUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await banUserById(req.params.id)

    res.status(200).send({
      message: 'banned the user',
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const unbanUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await unbanUserById(req.params.id)

    res.status(200).send({
      message: 'unbanned the user',
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const search = req.query.search as string

    const { users, totalPage, currentPage } = await findAllUsers(page, limit, search)
    res.status(200).send({
      message: 'return all users',
      payload: { users, totalPage, currentPage },
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(req.params.id)

    res.status(200).send({
      message: 'return single user',
      payload: user,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const updateSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updateUserData: UsersInput = req.body
    const file = req.file
    const imge = file?.path

    
    const updatedProduct = await updateUser(req.params.id, updateUserData, imge)
    res.status(200).send({
      message: 'The user has been updated successfully',
      payload: updatedProduct,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}

export const deleteSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await deleteUser(req.params.id)

    if (user && user.image) {
      await deleteImage(user.image)
    }
      res.status(200).send({
        message: ' user is deleted ',
      })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, 'ID format is not valid')
      next(error)
    } else {
      next(error)
    }
  }
}
