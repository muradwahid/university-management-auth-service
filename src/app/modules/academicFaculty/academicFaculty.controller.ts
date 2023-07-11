import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AcademicFacultyService } from "./academicFaculty.service";

const createFaculty = catchAsync(async(req:Request,res:Response) => {
  const title = req.body;
  const result = await AcademicFacultyService.createFaculty(title);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty created successfully',
        data: result,
      })
})


export const AcademicFacultyController = {
  createFaculty
}