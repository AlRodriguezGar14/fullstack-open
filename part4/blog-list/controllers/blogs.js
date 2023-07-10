const Blog = require("../models/blog");
const blogsRouter = require("express").Router();

// blogsRouter.get("/", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// blogsRouter.post("/", (request, response) => {
//   const blog = new Blog(request.body);
//
//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });
//
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogsRouter;
