import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterService, AcademicSemesterService as AcademicService } from "./academicSemester.service";

const createSemester = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicService.createSemester(academicSemesterData)

  sendResponse<IAcademicSemester>(res, { statusCode: httpStatus.OK, success: true, message: 'Academic semester is created successfully', data: result })
    next()
})

const getAllSemesters = catchAsync(async (req:Request,res:Response,next:NextFunction) => {
  const paginationOptions = pick(req.query,paginationFields)
  const result = await AcademicSemesterService.getAllSemesters(paginationOptions);
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Retrive Successfully !',
      meta:result.meta,
      data: result.data,
    })
    next()
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters
}