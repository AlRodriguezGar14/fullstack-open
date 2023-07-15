const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("test that only users properly formatted are uploaded", () => {
  test("Users is not created without a valid password", async () => {
    const newUser = {
      username: "usernamex",
      name: "mr.x",
      password: null,
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("Users is not created when the username is too short", async () => {
    const newUser = {
      username: "us",
      name: "mr.x",
      password: "12345",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });

  test("User with proper format is created", async () => {
    const newUser = {
      username: "experimental",
      name: "experiment",
      password: "12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("Duplicate user is not added to the database", async () => {
    const newUser = {
      username: "experimental",
      name: "experiment",
      password: "12345",
    };

    await api.post("/api/users").send(newUser).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
