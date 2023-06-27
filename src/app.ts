/* eslint-disable no-console */
import cors from 'cors';
import express, { Application } from 'express';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';
const app: Application = express()
app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1', routes)


//Testing
// app.get('/', async(req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing error')
//   // console.log(x);
//   // Promise.reject(new Error('Unhandled Promise Rejection'))
//   // throw new ApiError(400,'custom error send')
//   // next('error pass')
//   // throw new Error('error')
// })

// Global error handler
app.use(globalErrorHandler)

export default app