import jwt from 'jsonwebtoken'

import { dev } from '../config'
import { UserType } from '../types'

export const generateJwtToken = (payload: UserType): string => {
  return jwt.sign(payload, dev.app.jwtUserActivationKey, { expiresIn: '10m' })
}
