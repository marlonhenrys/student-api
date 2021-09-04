import app from "..";
import supertest from "supertest";

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

  it("should return a 404 error - not found", async () => {
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

  it("should delete a existing student", async () => {
    await supertest(app)
      .delete("/students/1")
      .then((res) => {
        expect(res.status).toBe(204);
        });
  });
});
