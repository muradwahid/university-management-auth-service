import { NextFunction, Request, Response } from "express"
import{ AnyZodObject, ZodEffects } from "zod"


const validateRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => async (req: Request, res: Response, next: NextFunction):Promise<void> => {
  try {
    await schema.parseAsync({
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies
    })
    return next()
  } catch (error) {
    next(error)
  }
}


export default validateRequest