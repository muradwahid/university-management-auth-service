import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  IAcademicFaculty,
  IAcademicFacultySerch,
} from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import {academicFacultySearchableFields } from './academicFaculty.constants'

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload)
  return result
}
const getSingleFaculty = async (
  payload: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(payload)
  return result
}
const getAllFaculties = async (
  filters: IAcademicFacultySerch,
  paginationOptios: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]> | null> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptios)
  const { searchTerm, ...filtersData } = filters
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value])=> ({
        [field]:value
      }))
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}
  sortConditions[sortBy] = sortOrder
  const whereCondition = andCondition?.length > 0 ? { $and: andCondition } : {}
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const updateFaculty =async (id:string,payload:IAcademicFaculty):Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true })
  return result
}
const deleteFaculty = async (id:string) => {
  const result = await AcademicFaculty.deleteOne({ _id: id })
  return result
}
export const AcademicFacultyService = {
  createFaculty,
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
