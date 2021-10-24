import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    try {
      const studentId = parseInt(req.params.id)
      const studentData = await StudentsDB.updateStudent(studentId, req.body);

      return res.status(StatusCodes.OK).json(studentData);
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const studentId = parseInt(req.params.id)
      await StudentsDB.deleteStudent(studentId);

      return res.status(StatusCodes.NO_CONTENT).json();
    } catch (error: any) {
      return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
