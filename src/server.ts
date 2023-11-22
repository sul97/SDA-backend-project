import express, { Application } from 'express'
import { config } from 'dotenv'

import productRoutes from './routers/productRoutes'
import userRoutes from './routers/userRoutes'

import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'
import { dev } from './config'
import morgan from 'morgan'
import { createHttpError } from './util/createHTTPError'
import { connectDB } from './config/db'

config()
const app: Application = express()
const port: number = dev.app.port

app.use(myLogger)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.use(apiErrorHandler)

app.use((req, res, next) => {
  const error = createHttpError(404, 'router not found')
  next(error)
})

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
  connectDB()
})

