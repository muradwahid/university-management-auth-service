import mongoose, { Schema, Types } from 'mongoose'
import { Gender, bloodGroup } from './admin.constant'
import { IAdmin } from './admin.interface'

const adminSchema = new Schema<IAdmin>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: Object, required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    gender: { type: String, enum: Gender },
    permanentAddress: { type: String, required: true },
    presentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup },
    managementDepartment: {
      type: Types.ObjectId,
      ref: ',managementDepartment',
      required: true,
    },
    designation: { type: String, required: true },
    profileImage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)
export const Admin = mongoose.model('Admin', adminSchema)
