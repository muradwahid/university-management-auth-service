/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { User } from '../user/user.model'
import { adminSearchableFileds } from './admin.constant'
import { IAdmin, IAdminFilters } from './admin.interface'
import { Admin } from './admin.model'

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOption: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOption)
  const andCondition = []
  if (searchTerm) {
    andCondition.push({
      $and: adminSearchableFileds.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereCondition = andCondition?.length > 0 ? { $and: andCondition } : {}
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const result = await Admin.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Admin.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id)
  return result
}
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const admin = await Admin.findOneAndDelete({ id }, { session })
    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete admin!')
    }
    await User.deleteOne({ id }, { session })
    session.commitTransaction()
    session.endSession()
    return admin
  } catch (error) {
    await session.abortTransaction()
    throw error
  }
}
const updateAdmin = async (
  id: string,
  updatedData: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !')
  }
  const { name, ...adminData } = updatedData
  const updatedAdminData: Partial<IAdmin> = { ...adminData }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>
      ;(updatedAdminData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  })
  return result
}
export const AdminService = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
}
