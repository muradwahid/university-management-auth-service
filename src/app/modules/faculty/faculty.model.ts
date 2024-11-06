import mongoose, { Schema, Types } from 'mongoose'
import { IFaculty } from './faculty.interface'

// Define the schema for the IFaculty type
const facultySchema = new Schema<IFaculty>({
  id: { type: String, required: true, unique: true },
  name: { type: Object, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  designation: { type: String, required: true },
  academicDepartment: {
    type: Types.ObjectId,
    ref: 'AcademicDepartment',
    required: true,
  },
  academicFaculty: {  
    type: Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
  profileImage: { type: String },
})
// Create the Mongoose model using the schema
export const Faculty = mongoose.model<IFaculty>('Faculty', facultySchema)
