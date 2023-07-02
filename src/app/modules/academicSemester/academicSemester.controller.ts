import { NextFunction, Request,Response } from "express";
import { AcademicSemesterService, AcademicSemesterService as AcademicService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IPaginationOptions } from "../../../interfaces/pagination";

const createSemester = catchAsync(async (req:Request, res:Response,next:NextFunction) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicService.createSemester(academicSemesterData)

  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Academic semester is created successfully', data: result })
    next()
})

const getAllSemesters = catchAsync(async (req:Request,res:Response,next:NextFunction) => {
  const paginationOptions = {
    page: Number(req.query.page),
    limit: Number(req.query.limit),
    sortBy: req.query.sortBy,
    sortOrder: req.query.sortOrder,
  }
  const result = await AcademicSemesterService.getAllSemesters(paginationOptions);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Retrive Successful',
      data: result,
    })
    next()
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters
}