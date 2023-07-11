import { Schema, model } from "mongoose";
import { IAcademicFaculty, academicFacultyModel } from "./academicFaculty.interface";

const academicFacultySchema=new Schema<IAcademicFaculty>({
  title:String
})

export const AcademicFaculty = model<IAcademicFaculty, academicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
)


