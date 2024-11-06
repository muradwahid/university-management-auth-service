import { Request, RequestHandler, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { UserService } from './user.service'
import { IUser } from './user.interface'
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body
    const result = await UserService.createStudent(student, userData)
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user create successfully',
      data: result,
    })
  }
)
const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body
    const result = await UserService.createFaculty(faculty, userData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty created successfully',
      data: result,
    })
  }
)
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body
  const result = await UserService.createAdmin(admin, userData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin created successfully',
    data: result,
  })
})
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
}
