const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

// test("there is one blog post", async () => {
//   const response = await api.get("/api/blogs");
//
//   expect(response.body).toHaveLength(1);
// });
//
describe("test the get requests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("verify there is id", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body[0].id).toBeDefined();
  });
});

describe("test the different post options", () => {
  test("post succesfully creates valid posts", async () => {
    const initialResponse = await api.get("/api/blogs");

    const newBlog = {
      title: "post blog test",
      author: "testing library",
      url: "www.tojest.com",
      likes: 10,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const newResponse = await api.get("/api/blogs");
    expect(newResponse.body).toHaveLength(initialResponse.body.length + 1);
    expect(newResponse.body[newResponse.body.length - 1].title).toContain(
      "post blog test"
    );
  });

  test("if not likes in the body, likes = 0", async () => {
    const newBlog = {
      title: "blog with no likes test",
      author: "testing library",
      url: "www.tojest.com",
    };

    const res = await api.post("/api/blogs").send(newBlog).expect(201);

    expect(res.body.likes).toBe(0);
  });

  test("not post the blog if url or title is missing", async () => {
    const newBlog = {
      title: "blog with no url test",
      author: "testing library",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("mutate the blog posts by id", () => {
  test("delete the post based on id", async () => {
    const id = "64ac31107b978ea411007e36";

    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
