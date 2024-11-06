/* eslint-disable no-console */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// cookie parser
app.use(cookieParser())

// application routes
app.use('/api/v1', routes)


//Testing
// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing error')
//console.log(x);
// Promise.reject(new Error('Unhandled Promise Rejection'))
// throw new ApiError(400,'custom error send')
// next('error pass')
// throw new Error('error')
// })

// Global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req:Request, res:Response, next:NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message:'Api Not Found'
        
      }
    ]
  })
  next()
})

export default app