import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { AcademicSemester } from './academicSemeste.model'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'
import { IPaginationOptions } from '../../../interfaces/pagination'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (paginationOptions:IPaginationOptions) => {
  
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters
}
