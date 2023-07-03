import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { AcademicSemester } from './academicSemeste.model'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicSemester.interface'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (paginationOptions: IPaginationOptions) => {
  


  const { page, limit, skip,sortBy,sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
  
  const sortConditions:{[key:string]:SortOrder}={} 

  sortConditions[sortBy]=sortOrder
  const result = await AcademicSemester.find().sort(sortConditions).skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total
    },
    data:result
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters
}
