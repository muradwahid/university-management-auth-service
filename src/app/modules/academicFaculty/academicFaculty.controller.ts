import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicFacultyFilterableFields } from './academicFaculty.constants'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyService } from './academicFaculty.service'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const title = req.body
  const result = await AcademicFacultyService.createFaculty(title)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })
})
const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  console.log(req.headers.authorization);
  console.log(req.user);
  const result = await AcademicFacultyService.getSingleFaculty(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrived successfully !',
    data: result,
  })
})
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Retrive Successfully !',
    meta: result?.meta,
    data: result?.data,
  })
})
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateData = req.body
  const result = await AcademicFacultyService.updateFaculty(id, updateData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Update Successfully !',
    data: result,
  })
})
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteFaculty(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})
export const AcademicFacultyController = {
  createFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
