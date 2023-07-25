const Blog = require("../models/blog");
const User = require("../models/user");
const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }

  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  } catch (e) {
    console.error({ error: e.message });
    return response.send(e).status(400);
  }
  if (!decodedToken.id) {
    return response.status(200).json({ error: "invalid token" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  if (blog.url === undefined || blog.title === undefined) {
    response
      .status(400)
      .json({ status: 400, message: "information is missing" });
    return;
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url } = await Blog.findById(req.params.id);
  const likes = req.body.likes;
  const blog = { ...{ title, author, url }, likes: likes };
  console.log(blog);
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.json(updatedBlog);
});

module.exports = blogsRouter;
