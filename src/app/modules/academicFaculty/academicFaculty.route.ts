import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validations';
const router = express.Router()

router.post('/create-faculty',validateRequest(AcademicFacultyValidation.createFacultyZodSchema) ,AcademicFacultyController.createFaculty)
router.get('/:id',AcademicFacultyController.getSingleFaculty)
router.get('/', AcademicFacultyController.getAllFaculties);
router.patch('/:id',validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),AcademicFacultyController.updateFaculty);
router.delete('/:id',AcademicFacultyController.deleteFaculty)

export const AcademicFacultyRoutes=router