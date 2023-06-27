/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-const */
import { ErrorRequestHandler } from 'express'
import { Error } from 'mongoose'
import { ZodError } from 'zod'
import config from '../../config'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import handleZodError from '../../errors/handleZodError'
import { IGenericErrorMessage } from '../../interfaces/error'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessage: IGenericErrorMessage[] = []
  config.env === 'development'
    ? console.log('🌭 globalErrorhandler', err)
    : errorLogger.error('🌭 globalErrorhandler', err)

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessage = simplifiedError?.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage=simplifiedError?.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessage = err?.message ? [
      {
        path: "",
        message:err?.message
      }
    ]:[]
  }else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message ? [
      {
        path: '',
        message:err?.message
      }
    ]:[]
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMassage: errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
