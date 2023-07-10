const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("there is one blog post", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(1);
});

test("verify there is id", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body[0].id).toBeDefined();
});
