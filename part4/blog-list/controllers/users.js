const bycript = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bycript.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(200).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

module.exports = usersRouter;
