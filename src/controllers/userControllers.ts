import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import User from '../models/userSchema'
import bcrypt from 'bcrypt'
import slugify from 'slugify'
import { createHttpError } from '../util/createHTTPError'
import { dev } from '../config'
import { handleSendEmail } from '../helper/sendEmail'

export const processRegisterUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, address, phone } = req.body
    const imagePath = req.file?.path

    const isUserExists = await User.exists({ email: email })

    if (isUserExists) {
      throw createHttpError(409, 'User already exists')
    }

    //create token
    const hashedPassword = await bcrypt.hash(password, 10)
    const tokenPayload = {
      name: name,
      email: email,
      password: hashedPassword,
      address: address,
      phone: phone,
      image: imagePath,
    }

    const token = jwt.sign(tokenPayload, dev.app.jwtUserActivationKey, { expiresIn: '10m' })

    //send email hear => token inside the email
    const emailData = {
      email: email,
      subjeect: 'Activate Your Account',
      html: `<h1>Hello ${name}</h1>
      <p>Please activate your account by : <a href="http://localhost:5050/users/activate/${token}">click the following link</a></p>`,
    }
    //send email
    await handleSendEmail(emailData)

    res.status(200).json({
      message: 'check your Email to activate your account',
      token: token,
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
      const errorMessage = error instanceof TokenExpiredError? "expired token":"Invalid token"
      next(createHttpError(401, errorMessage))
    } else {
      next(error)
    }
    
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
    const newuser = new User({
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
