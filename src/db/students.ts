import { StatusCodes } from "http-status-codes";
import { HttpError } from "../helpers/errors";
import { Student } from "../types/Student";

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
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Update an existing student
 * @param id Student ID
 * @param student Student data
 * @returns Student updated
 */
function updateStudent(id: Number, student: Student) {
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex === -1) {
    return Promise.reject(new HttpError('student-not-found', StatusCodes.NOT_FOUND));
  }

  students[studentIndex] = Object.freeze({
    ...students[studentIndex],
    ...student
  });

  return Promise.resolve(students[studentIndex]);
}

/**
 * Delete an existing student
 * @param id Student ID
 * @returns Student 
 */

function deleteStudent(id: Number) {
  const studentIndex = students.findIndex(student => student.id === id);

  if (studentIndex === -1) {
    return Promise.reject(new HttpError('student-not-found', StatusCodes.NOT_FOUND));

  }
  students.splice(studentIndex, 1);

  return Promise.resolve({message: `Student #${id} is deleted.`});
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

export { addStudent, updateStudent, getStudents, deleteStudent };
