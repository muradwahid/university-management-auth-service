import { Model } from 'mongoose'

export type IAcademicFaculty = {
  title: string
}
export type IAcademicFacultySerch = {
  searchTerm?: string
}
export type academicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>
