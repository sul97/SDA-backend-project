import jwt from 'jsonwebtoken'

import { dev } from '../config'
import { UserType } from '../types'

export const generateJwtToken = (id: UserType) => {
  return jwt.sign(id, dev.app.jwtUserActivationKey, { expiresIn: '10m' })
}
