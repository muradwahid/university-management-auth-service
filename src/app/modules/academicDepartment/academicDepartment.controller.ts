import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicDepartmentFilterableFields } from "./academicDepartment.constant";
import { IAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartmentService } from "./academicDepartment.service";

const createDepartment = catchAsync(async (req:Request,res:Response) => {
  const {...academicDepartmentData} = req.body;
  const result = await AcademicDepartmentService.createDepartment(academicDepartmentData);
  sendResponse<IAcademicDepartment>(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data:result
  })

})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department fetch successful',
    data:result
  })
})
const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result= await AcademicDepartmentService.getAllDepartment(filters,paginationOptions)
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrive successful',
    meta: result?.meta,
    data: result?.data
  });
})
const updateDepartment = catchAsync(async (req:Request,res:Response) => {
  const { id } = req.params;
  const updatedData = req.body
  const result = await AcademicDepartmentService.updateDepartment(id,updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully',
    data: result
  })
})
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department deleted successfully',
    data:result
  })
})
export const AcademicDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment
}