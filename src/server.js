const express = require("express");
require("./db/mongoose.js");
const { User } = require("./models/user.js");
const { Task } = require("./models/task.js");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

//user routes
app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const response = await User.find({});
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

//task routes
app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const response = await Task.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
