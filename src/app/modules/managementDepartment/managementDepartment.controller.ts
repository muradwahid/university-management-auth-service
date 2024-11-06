import { Request, Response } from 'express'
import httpStatus, { OK } from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import { IManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartmentService } from './managementDepartment.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body
  const result = await ManagementDepartmentService.createDepartment(
    departmentData
  )
  sendResponse<IManagementDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management Department created successfully',
    data: result,
  })
})
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, managementDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await ManagementDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  )
  sendResponse<IManagementDepartment[]>(res, {
    statusCode: OK,
    success: true,
    message: 'Management Department retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ManagementDepartmentService.getSingleDepartment(id)
  sendResponse<IManagementDepartment>(res, {
    statusCode: OK,
    success: true,
    message: 'Management Department retrieved successfully',
    data: result,
  })
})
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  const result = await ManagementDepartmentService.updateDepartment(
    id,
    updatedData
  )
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Management Department updated successfully',
    data: result,
  })
})
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ManagementDepartmentService.deleteDepartment(id)
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Department deleted successfully',
    data: result,
  })
})
export const ManagementDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
