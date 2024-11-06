import { Schema, model } from 'mongoose'
import {
  IAcademicFaculty,
  academicFacultyModel,
} from './academicFaculty.interface'

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicFaculty = model<IAcademicFaculty, academicFacultyModel>(
  'academicFaculty',
  academicFacultySchema
)
