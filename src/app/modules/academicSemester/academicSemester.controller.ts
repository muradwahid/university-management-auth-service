import { NextFunction, Request,Response } from "express";
import { AcademicSemesterService, AcademicSemesterService as AcademicService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { pagination } from "../../../constants/pagination";

const createSemester = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicService.createSemester(academicSemesterData)

  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Academic semester is created successfully', data: result })
    next()
})

const getAllSemesters = catchAsync(async (req:Request,res:Response,next:NextFunction) => {
  const paginationOptions=pick(req.query,pagination)
  console.log(paginationOptions);
  // const result = await AcademicSemesterService.getAllSemesters(paginationOptions);
  //   sendResponse(res, {
  //     statusCode: httpStatus.OK,
  //     success: true,
  //     message: 'Semester Retrive Successful',
  //     data: result,
  //   })
  //   next()
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters
}