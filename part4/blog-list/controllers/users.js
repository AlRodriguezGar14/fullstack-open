const bycript = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || !username) {
    res.status(400).json({
      status: 400,
      message: "Double check that you added password and username",
    });
    return;
  }
  if (password.length < 3) {
    res.status(400).json({
      status: 400,
      message: "Password too short. It should have at least 3 characters",
    });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({
      status: 400,
      message: "username is too short, it must have more than 3 characters",
    });
    return;
  }
  const saltRounds = 10;
  const passwordHash = await bycript.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
    console.log(err);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1 });

  res.json(users);
});

module.exports = usersRouter;
