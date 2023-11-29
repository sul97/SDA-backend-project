import jwt from 'jsonwebtoken'

export const generateJwtToken = (tokenPayload: object, secretKey: string, expiresIn = '') => {
  try {
    if (!tokenPayload) {
      throw new Error('Token payload must be provided')
    }
    if (typeof secretKey !== 'string' || secretKey === '') {
      throw new Error('secretKey must be provided ')
    }
    if (!expiresIn) {
      throw new Error('expiresIn must be provided')
    }

    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: expiresIn })
    return token
  } catch (error) {
    throw error
  }
}

export const verifyJwtToken = (tokenPayload: '', secretKey: string) => {
  try {
    if (!tokenPayload) {
      throw new Error('Token payload must be provided')
    }
    if (typeof secretKey !== 'string' || secretKey === '') {
      throw new Error('secretKey must be provided ')
    }

    const token = jwt.verify(tokenPayload, secretKey)
    return token
  } catch (error) {
    throw error
  }
}
