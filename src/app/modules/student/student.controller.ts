import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IStudent } from './student.interface'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'

const getAllStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await StudentService.getAllStudent(
      filters,
      paginationOptions
    )
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Retrive Successfully !',
      meta: result.meta,
      data: result.data,
    })
  }
)
const getSingleStudent: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const {id } = req.params
    const result = await StudentService.getSingleStudent(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Student Retrived Successfully',
      data:result
    })
  }
)
const deleteStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await StudentService.deleteStudent(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    })
  }
)

const updateStudent:RequestHandler=catchAsync(async (req:Request,res:Response) => {
  const { id } = req.params;
  const updatedStudentData = req.body
  const result = await StudentService.updateStudent(id,updatedStudentData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result
  })
})

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
}
