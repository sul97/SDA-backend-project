import express, { Application } from 'express'
import { config } from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import { dev } from './config'
import { connectDB } from './config/db'
import { createHttpError } from './util/createHTTPError'

import myLogger from './middlewares/logger'
import apiErrorHandler from './middlewares/errorHandler'

import productRoutes from './routers/productRoutes'


config()
const app: Application = express()
const port: number = dev.app.port

app.use(myLogger)
app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


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
