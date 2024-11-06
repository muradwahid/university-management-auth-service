import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router=express.Router();
router.post('/create-department',validateRequest(ManagementDepartmentValidation.createManagementDepartmentZodSchema), ManagementDepartmentController.createDepartment)
router.get('/:id', ManagementDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
)
router.delete('/:id',ManagementDepartmentController.deleteDepartment)
router.get('/',ManagementDepartmentController.getAllDepartment);

export const ManagementDepartmentRoute=router