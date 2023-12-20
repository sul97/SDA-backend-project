import { Request, Response, NextFunction } from 'express'
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken'

import { createHttpError } from '../util/createHTTPError'

import {
  processRegisterUserService,
  findAllUsers,
  findUserById,
  updateBanStatusById,
  updateUser,
  forgetPasswordAction,
  resstPasswordAction,
  deleteUser,
} from '../services/userService'
import { UsersInput } from '../types/userTypes'
import { handleCastError } from '../util/handelMongoID'

import { v2 as cloudinary } from 'cloudinary'
import { dev } from '../config'
import { verifyJwtToken } from '../util/jwtTokenHelper'
import { User } from '../models/userSchema'
import {
  deleteFromCloudinary,
  uploadToCloudinary,
  valueWithoutExtension,
} from '../helper/cloudinaryHelper'

cloudinary.config({
  cloud_name: dev.cloud.cloudinaryName,
  api_key: dev.cloud.cloudinaryAPIkey,
  api_secret: dev.cloud.cloudinaryAPISecretkey,
})

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
    })
  } catch (error) {
    next(error)
  }
}

// export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { token } = req.body
//     const user = await activeUser(token)

//     res.status(200).json({
//       message: 'User registration successfully',
//     })
//   } catch (error) {
//     if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
//       const errorMessage = error instanceof TokenExpiredError ? 'expired token' : 'Invalid token'
//       next(createHttpError(401, errorMessage))
//     } else {
//       next(error)
//     }
//   }
// }

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token
    if (!token) {
      throw createHttpError(400, 'please Provide a token')
    }
    const decoded = verifyJwtToken(token, String(dev.app.jwtUserActivationKey)) as JwtPayload
    if (!decoded) {
      throw createHttpError(401, 'Token is Invalid ')
    }

    const response = await cloudinary.uploader.upload(decoded.image, { folder: 'user_image' })
    decoded.image = response.secure_url
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
    await updateBanStatusById(req.params.id, true)

    res.status(200).send({
      message: 'banned the user',
    })
  } catch (error) {
    handleCastError(error, next)
  }
}

export const unbanUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateBanStatusById(req.params.id, false)

    res.status(200).send({
      message: 'unbanned the user',
    })
  } catch (error) {
    handleCastError(error, next)
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
    handleCastError(error, next)
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
    handleCastError(error, next)
  }
}
export const deleteSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await deleteUser(req.params.id)

    // if (user && user.image) {
    //   await deleteImage(user.image)
    // }
     if (user && user.image) {
      const publicId = await valueWithoutExtension(user.image)
      await deleteFromCloudinary(`user_image/${publicId}`)
    }
    res.status(200).send({
      message: ' user is deleted ',
    })
  } catch (error) {
    handleCastError(error, next)
  }
}

export const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const token = await forgetPasswordAction(email)
    res.status(200).json({
      message: 'Check your email to rest your pawword',
      token,
    })
  } catch (error) {
    next(error)
  }
}
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token
    const password = req.body.password

    const user = await resstPasswordAction(token, password)

    res.status(200).json({
      message: 'The password has been reset successfully',
    })
  } catch (error) {
    next(error)
  }
}
