import { Schema, model } from 'mongoose'
import httpStatus from 'http-status'
import { IAcademicSemester, academicSemesterModel } from './academicSemester.interface'
import { AcademicSemesterTitles, academicSemesterCodes, academicSemesterMonths } from './academicSemester.constant'
import ApiError from '../../../errors/ApiError'
const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: AcademicSemesterTitles },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
)
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({ title: this.title, year: this.year });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Academic Semester is already exist !'
    )
  }
  next()
})

export const AcademicSemester = model<IAcademicSemester, academicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
)
