/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose, { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { User } from '../user/user.model'
import { studentSearchableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { Student } from './student.model'

const getAllStudent = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
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
  if (Object.keys(filterData).length) {
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
  const whereCondition = andCondition?.length > 0 ? { $and: andCondition } : {}
  const result = await Student.find(whereCondition)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
  return result
}
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }
  const { name, guardian, localGuardian, ...studentData } = payload
  const updatedStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` // 'name.firstName'
      ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}` // 'guardian.fatherName'
      ;(updatedStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianDataKey = `localGuardian.${key}`
      ;(updatedStudentData as any)[localGuardianDataKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }
  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  })
    .populate('academicFaculty')
    .populate('academicDepartment')
    .populate('academicSemester')
  return result
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const student = await Student.findOneAndDelete({ id }, { session })
    if (!student) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Faild to delete student')
    }
    await User.deleteOne({ id }, { session })
    session.commitTransaction()
    session.endSession()
    return student
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const StudentService = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
}
