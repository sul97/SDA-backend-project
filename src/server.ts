import express, { Application } from 'express'
import { config } from 'dotenv'

import usersRouter from './routers/users'
import productsRouter from './routers/products'
import ordersRouter from './routers/orders'
import apiErrorHandler from './middlewares/errorHandler'

import productRoutes from './routers/productRoutes'
import morgan from 'morgan'
import myLogger from './middlewares/logger'


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

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`)
  connectDB()
})
