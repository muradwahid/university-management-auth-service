import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}
export type IAdmin = {
  id: string
  name: UserName
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: 'male' | 'female'
  permanentAddress: string
  presentAddress: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  managementDepartment: Types.ObjectId | IManagementDepartment
  designation: string
  profileImage?: string
}
export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  managementDepartment?: string
  designation?: string
}
export type AdminModel = Model<IAdmin, Record<string, unknown>>
