import { StatusCodes } from "http-status-codes";
import { HttpError } from "../helpers/errors";
import { Student } from "../entities/Student";
import { getConnection } from "typeorm";

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
async function addStudent(student: Student) {
  const studentRepository = getConnection().getRepository(Student);
  const newStudent = new Student(student);

  await studentRepository.save(newStudent);

  return newStudent;
}

/**
 * Update an existing student
 * @param id Student ID
 * @param student Student data
 * @returns Student updated
 */
async function updateStudent(id: number, student: Student) {
  const studentRepository = getConnection().getRepository(Student);
  const studentDB = await studentRepository.findOne(id);

  if (!studentDB) {
    throw new HttpError('student-not-found', StatusCodes.NOT_FOUND);
  }

  Object.assign(studentDB, student);
  await studentRepository.save(studentDB);

  return studentDB;
}

/**
 * Delete an existing student
 * @param id Student ID
 * @returns Student 
 */

async function deleteStudent(id: number) {
  const studentRepository = getConnection().getRepository(Student);
  const studentDB = await studentRepository.findOne(id);

  if (!studentDB) {
    throw new HttpError('student-not-found', StatusCodes.NOT_FOUND);
  }

  studentRepository.remove(studentDB)
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => getConnection().getRepository(Student).find();

export { addStudent, updateStudent, getStudents, deleteStudent };
