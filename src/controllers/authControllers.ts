import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

import User from '../models/userSchema'
import { createHttpError } from '../util/createHTTPError'
import { dev } from '../config'

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      //create http error //status 404
      const error = createHttpError(404, 'User not found with this email')
      throw error
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      //create http error //status 404
      const error = createHttpError(404, 'Password did not match')
      throw error
    }

    if (user.isBanned) {
      //create http error //status 404
      const error = createHttpError(404, 'You are banned. Please contact the authority')
      throw error
    }

    const accessToken = JWT.sign({ _id: user._id }, dev.app.jwtAccessKey, { expiresIn: '2m' })
    const cookie = 
    res.cookie('access_token', accessToken, {
        maxAge: 5 * 60 * 1000, // 5 mintues
        httpOnly : true, // prevent from store in browser
        sameSite:'none' // can be different port
    })
    res.status(200).send({
      message: 'user is logged in',
    })
  } catch (error) {
    next(error)
  }
}
