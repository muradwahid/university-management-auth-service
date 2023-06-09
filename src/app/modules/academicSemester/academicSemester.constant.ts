import {
  IAcademicSemesterMonths,
  IAcademicSemesterTitles,
  IAcademicSemesterCodes,
} from './academicSemester.interface'

export const academicSemesterMonths: IAcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicSemesterTitles: IAcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const academicSemesterCodes: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
export const filtersFields = ['searchTerm', 'year', 'code', 'title']
export const academicSemesterSearchAbleField = ['title', 'code', 'year']
