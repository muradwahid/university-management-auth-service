import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router()
router.post('/create-department', validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema), AcademicDepartmentController.createDepartment)
router.get('/:id', AcademicDepartmentController.getSingleDepartment);
router.get('/',AcademicDepartmentController.getAllDepartment)
router.patch('/:id', validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema), AcademicDepartmentController.updateDepartment);
router.delete('/:id',AcademicDepartmentController.deleteDepartment)
export const AcademicDepartmentRoute = router;