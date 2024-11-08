import { z } from 'zod'

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error:'Academic Faculty is required'
    })
  }),
})
const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    academicFaculty: z.string({
      required_error: 'Academic Faculty is required',
    }).optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
}
