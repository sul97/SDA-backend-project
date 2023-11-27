import { Router } from 'express'

import { handleLogin, handleLogout } from '../controllers/authControllers'
import { isLoggedIn, isLoggedOut } from '../middlewares/auth'
import { userLoginValidator } from '../validation/userValidation'

const authRoutes = Router()

authRoutes.post('/login', isLoggedOut, userLoginValidator, handleLogin)
authRoutes.post('/logout', isLoggedIn, handleLogout)

export default authRoutes
