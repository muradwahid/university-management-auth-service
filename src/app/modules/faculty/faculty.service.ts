/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import { IGenericResponse } from '../../../interfaces/common'
import { studentSearchableFields } from '../student/student.constant'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { User } from '../user/user.model'

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filterData } = filters
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const { page, limit, skip, sortBy, sortOrder } =
  paginationHelpers.calculatePagination(paginationOptions)
  const sortCondition: { [key: string]: SortOrder } = {}
  sortCondition[sortBy] = sortOrder
  const whereCondition = andCondition?.length >0 ?{$and:andCondition}:{}
  const result = await Faculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Faculty.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleFaculty = async (id:string) => {
  const result = await Faculty.findById(id);
  return result
}
const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND,'Faculty not found!')
  };
  const { name, ...FacultyData } = payload;
  const updatedFacultyData:Partial<IFaculty> ={...FacultyData};
  if (name && Object.keys(name).length>0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedFacultyData as any)[nameKey] =name[key as keyof typeof name ];
    })
  }
  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, { new: true });
  return result;
}
const deleteFaculty = async (id:string) => {
  const isExist = await Faculty.findOne({ id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND,'Faculty not found')
  };
  const session=await mongoose.startSession();
  try {
    session.startTransaction();
    const faculty = await Faculty.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(httpStatus.NOT_FOUND,'Faild to delete faculty')
    }
    await User.deleteOne({id}, { session })
    session.commitTransaction();
    session.endSession();
    return faculty
  } catch (error) {
    session.abortTransaction();
    throw error
  }
}
export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
