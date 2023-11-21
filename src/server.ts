import express, { Application } from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import productRoutes from './routers/productRoutes'
import userRoutes from './routers/userRoutes'
import ordersRouter from './routers/orders'
import apiErrorHandler from './middlewares/errorHandler'
import myLogger from './middlewares/logger'
import { dev } from './config'
import morgan from 'morgan'
import { createHttpError } from './util/createHTTPError'
import { connectDB } from './config/db'

config()
const app: Application = express()
const port: number = dev.app.port
// const PORT = 5050
// const URL = process.env.ATLAS_URL as string

app.use(myLogger)
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//app.use('/api/users', usersRouter)
//app.use('/api/orders', ordersRouter)
//app.use('/api/products', productsRouter)
app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.use(apiErrorHandler)

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log('Database connected')
//   })
//   .catch((err) => {
//     console.log('MongoDB connection error, ', err)
//   })

app.use((req, res, next) => {
  const error = createHttpError(404, 'router not found')
  next(error)
})

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
  connectDB()
})

// app.listen(PORT, () => {
//   console.log('Server running http://localhost:' + PORT)
// })
