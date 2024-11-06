import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IManagementDepartment, IManagementDepartmentFilters } from "./managementDepartment.interface";
import { ManagementDepartment } from "./managementDepartment.model";
import { managementDepartmentSearchableFields } from "./managementDepartment.constant";

const createDepartment = async (payload:IManagementDepartment):Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload)
  return result;
}
const getAllDepartment = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const {page,limit,skip,sortBy,sortOrder}=paginationHelpers.calculatePagination(paginationOptions)
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $and: managementDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options:'i'
        }
      }))
    })
  }
  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    });
  }

  const sortCondition:{[key:string]:SortOrder}={}
  if(sortBy && sortOrder){
    sortCondition[sortBy]=sortOrder
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {}
  const result = await ManagementDepartment.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total=await ManagementDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total
    },
    data: result
  }
}
const getSingleDepartment = async (id: string):Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id)
  return result
}
const updateDepartment = async (id: string,payload:IManagementDepartment): Promise<IManagementDepartment | null> => { 
  const result = await ManagementDepartment.findOneAndUpdate({ _id: id }, payload, { new: true });
  return result
}
const deleteDepartment = async (id: string) => {
  const result = await ManagementDepartment.findByIdAndDelete(id);
  return result;
}
export const ManagementDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}