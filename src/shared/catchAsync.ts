import { Request,Response,NextFunction, RequestHandler } from "express";
import { errorLogger } from "./logger";

const catchAsync = (fn:RequestHandler) => {
  return async ( req:Request, res:Response, next:NextFunction)=> {
    try {
      await fn(req, res,next)
    } catch (error) {
      next(error)
      errorLogger.error(error)
    }
  }
}

export default catchAsync