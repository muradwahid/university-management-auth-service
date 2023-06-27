import { Request,Response,NextFunction } from "express";
import { errorLogger } from "./logger";

const catchAsync = (fn) => {
  return async ( req:Request, res:Response, next:NextFunction)=> {
    try {
      fn(req, res)
    } catch (error) {
      errorLogger.error(error)
      next(error)
    }
  }
}

export default catchAsync