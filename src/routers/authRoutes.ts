import { Router } from 'express'
import { handleLogin } from '../controllers/authControllers'

const authRoutes = Router()

authRoutes.post('/login', handleLogin)

export default authRoutes
