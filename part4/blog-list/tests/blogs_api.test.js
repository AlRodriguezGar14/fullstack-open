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

// test("there is one blog post", async () => {
//   const response = await api.get("/api/blogs");
//
//   expect(response.body).toHaveLength(1);
// });

test("verify there is id", async () => {
  const res = await api.get("/api/blogs");

  expect(res.body[0].id).toBeDefined();
});

test("post succesfully creates valid posts", async () => {
  const initialResponse = await api.get("/api/blogs");

  const newBlog = {
    title: "testing blog",
    author: "testing library",
    url: "www.tojest.com",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const newResponse = await api.get("/api/blogs");
  expect(newResponse.body).toHaveLength(initialResponse.body.length + 1);
  expect(newResponse.body[newResponse.body.length - 1].title).toContain(
    "testing"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
