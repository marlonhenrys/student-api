import { StatusCodes } from "http-status-codes";
import { HttpError } from "../helpers/errors";
import { Student } from "../entities/Student";
import { getConnection, getRepository } from "typeorm";
import { __assign } from "tslib";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
async function addStudent(student: Student) {
  const newStudent = new Student(student);
  const connection = await getConnection().getRepository(Student);

  await connection.save(newStudent);

  return newStudent;
}

/**
 * Update an existing student
 * @param id Student ID
 * @param student Student data
 * @returns Student updated
 */
async function updateStudent(id: number, student: Student) {
  const studentRepository = getConnection().getRepository(Student)
  const studentDB = await studentRepository.findOne(id)

  if (!studentDB) {
    return Promise.reject(new HttpError('student-not-found', StatusCodes.NOT_FOUND));
  }

  Object.assign(studentDB, student)
  await studentRepository.save(studentDB)

  return Promise.resolve(studentDB);
}

/**
 * Delete an existing student
 * @param id Student ID
 * @returns Student 
 */

async function deleteStudent(id: number) {
  const studentRepository = getConnection().getRepository(Student)
  const studentDB = await studentRepository.findOne(id)

  if (!studentDB) {
    return Promise.reject(new HttpError('student-not-found', StatusCodes.NOT_FOUND));
  }

  await studentRepository.remove(studentDB);

  return Promise.resolve();
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => getConnection().getRepository(Student).find()

export { addStudent, updateStudent, getStudents, deleteStudent };
