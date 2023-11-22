import express, { Application } from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'

import usersRouter from './routers/users'
import productsRouter from './routers/products'
import ordersRouter from './routers/orders'
import apiErrorHandler from './middlewares/errorHandler'

import productRoutes from './routers/productRoutes'
import myLogger from './middlewares/logger'
import { createHttpError } from './util/createHTTPError'
import { connectDB } from './config/db'


config()
const app = express()
const PORT = 5050
const URL = process.env.ATLAS_URL as string

app.use(myLogger)
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/products', productsRouter)

app.use(apiErrorHandler)

app.use((req, res, next) => {
  const error = createHttpError(404, 'router not found')
  next(error)
})

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${Port}`)
  connectDB()
})
