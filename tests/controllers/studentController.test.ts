import app from "..";
import supertest from "supertest";

jest.mock("../../src/db/students", () => {
  const originalModule = jest.requireActual("../../src/db/students");

  return {
    __esModule: true,
    ...originalModule,
    addStudent: jest.fn(() => 
      Promise.resolve({
        id: 2,
        name: "John Doe 2",
        email: "john.doe.2@example.com",
        city: "Belo Horizonte",
        birth: new Date("22/01/1996").toISOString(),
      })
    )
  }
});

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should return a 404 error - not found - update", async () => {
    const updatedStudent = {
      name: "John Doe 3",
      email: "john.doe.3@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/14/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/10")
      .send(updatedStudent)
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ message: "student-not-found" });
      });
  });

  it("should update a existing student", async () => {
    const updatedStudent = {
      name: "John Doe 4",
      email: "john.doe.4@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/15/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/1")
      .send(updatedStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 1, ...updatedStudent }));
  });

  it("should return HTTP error for new student with empty data", async () => {
    await supertest(app)
      .post("/students")
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });

  it("should return HTTP error for new student with invalid email", async () => {
    const newStudent = {
      name: "John Doe 5",
      email: "john.doe.5",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });

  it("should return HTTP error for updating student with empty data", async () => {
    await supertest(app)
    .put("/students/1")
    .then((res) => {
      expect(res.status).toBe(500);
    });
  });

  it("should return HTTP error for updating student with invalid email", async () => {
    const newStudent = {
      name: "John Doe 6",
      email: "john.doe.6",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/1")
      .send(newStudent)
      .then((res) => {
        expect(res.status).toBe(500);
      });
  });

  it("should delete a existing student", async () => {
    await supertest(app)
      .delete("/students/1")
      .then((res) => expect(res.status).toBe(204));
  });

  it("should return a 404 error - not found - delete", async () => {
    await supertest(app)
      .delete("/students/10")
      .then((res) => {
        expect(res.status).toBe(404);
        expect(res.body).toMatchObject({ message: "student-not-found"});
      });
  });

});
