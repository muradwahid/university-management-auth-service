import { Request,Response,NextFunction, RequestHandler } from "express";
import { errorLogger } from "./logger";

const catchAsync = (fn:RequestHandler) => {
  return async ( req:Request, res:Response, next:NextFunction)=> {
    try {
      fn(req, res,next)
    } catch (error) {
      errorLogger.error(error)
      next(error)
    }
  }
}

export default catchAsync