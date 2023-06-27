import { Request,Response } from "express";
import { AcademicSemesterService as AcademicService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";

const createSemester = catchAsync(async (req:Request, res:Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicService.createSemester(academicSemesterData)
  res.status(200).json({
    success: true,
    message: 'academic semester is created successfully',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester
}