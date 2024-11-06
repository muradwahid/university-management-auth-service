import { Request,Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { paginationFields } from "../../../constants/pagination";
import sendResponse from "../../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const paginationOption = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmin(filters, paginationOption);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Retrived Successfully',
    meta: result.meta,
    data:result.data
  })
})
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getSingleAdmin(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Retrived Successfully',
    data: result
  })
})
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteAdmin(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Deleted Successfully',
    data: result
  })
})
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await AdminService.updateAdmin(id, updatedData)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully!',
    data:result
  })
})
export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}