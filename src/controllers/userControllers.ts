import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema'

import slugify from 'slugify'
import { createHttpError } from '../util/createHTTPError'
import { dev } from '../config'
import { UsersType } from '../types'

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, address, phone } = req.body
    const imagePath = req.file?.path

    const isUserExists = await User.exists({ email: req.body.email })

    if (isUserExists) {
      throw createHttpError(409, 'User already exists')
    }

    // const newUser = new User({
    //   name: name,
    //   email: email,
    //   password: password,
    //   address: address,
    //   phone: phone,
    //   image: imagePath,
    // })
    //create token
    const token = jwt.sign(
      {
        name: name,
        email: email,
        password: password,
        address: address,
        phone: phone,
        image: imagePath,
      },
      dev.app.jwtUserActivationKey
    )
    // await newUser.save()
    //send email hear => token inside the email

    res.status(200).json({
      message: 'check your Email to activate your account',
      token: token,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find()
    res.send({
      message: 'return all users',
      payload: users,
    })
  } catch (error) {
    next(error)
  }
}

export const createSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const userExist = await User.exists({ firstName: firstName })
    if (userExist) {
      throw new Error('user already exist with this name')
    }
    const newuser:UsersType = new User({
      firstName,
      slug: slugify(firstName),
      lastName,
      email,
      password,
    })
    await newuser.save()

    res.status(201).send({
      message: ' user is created ',
      payload: newuser,
    })
  } catch (error) {
    next(error)
  }
}

export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({ slug: req.params.slug })
    if (user.length === 0) {
      throw new Error('user not found ')
    }
    res.send({
      message: 'return single user',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await User.findOneAndDelete({ slug: req.params.slug })

    if (!response) {
      throw new Error('user not found ')
    }
    res.send({
      message: ' user is deleted ',
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.firstName) {
      req.body.slug = slugify(req.body.firstName)
    }
    const user = await User.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true })

    if (!user) {
      throw new Error('user not found')
    }
    res.send({
      message: ' user is updated ',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}
