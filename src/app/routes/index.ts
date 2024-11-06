import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route'
import { StudentRoute } from '../modules/student/student.route'
import { FacultyRoute } from '../modules/faculty/faculty.route'
import { ManagementDepartmentRoute } from '../modules/managementDepartment/managementDepartment.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoute } from '../modules/auth/auth.route'
const router = express.Router()

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculty', route: AcademicFacultyRoutes },
  { path: '/academic-department', route: AcademicDepartmentRoute },
  { path: '/student', route: StudentRoute },
  { path: '/faculty', route: FacultyRoute },
  { path: '/management-department', route: ManagementDepartmentRoute },
  {path:'/admins',route:AdminRoutes},
  {path:'/auth',route:AuthRoute},
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
