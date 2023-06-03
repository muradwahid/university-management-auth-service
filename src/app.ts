import cors from 'cors'
import express, { Application } from 'express'
import usersRoutes from './app/modules/users/users.route'
const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users', usersRoutes)

export default app
