import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { academicDepartmentSearchableFields } from "./academicDepartment.constant";
import { IAcademicDepartment, IAcademicDepartmentFilters } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createDepartment = async (payload:IAcademicDepartment) => {
  const result = (await AcademicDepartment.create(payload)).populate('academicFaculty')
  return result
}
const getSingleDepartment = async (payload: string):Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(payload).populate('academicFaculty')
  return result
}
const getAllDepartment = async (filters:IAcademicDepartmentFilters, paginationOptions:IPaginationOptions):Promise<IGenericResponse<IAcademicDepartment[]| null>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);
  const andCondition = [];


  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }



  const sortConditions: { [key: string]:SortOrder } = {};
  sortConditions[sortBy] = sortOrder
  const whereCondition = andCondition?.length >= 1 ? { $and: andCondition } : {}
  const result= await AcademicDepartment.find(whereCondition).populate('academicFaculty').sort(sortConditions).skip(skip).limit(limit)
  const total = await AcademicDepartment.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    }
}
const updateDepartment = async (id: string, payload: IAcademicDepartment) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true }
  ).populate('academicFaculty');
  return result
}
const deleteDepartment = async (id: string) => {
  const result=await AcademicDepartment.findByIdAndDelete(id)
  return result
}
export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
}