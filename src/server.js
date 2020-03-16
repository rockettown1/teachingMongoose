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

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      console.log("no user found");
      return res.status(404).send("No User Found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
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

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      console.log("no task found");
      return res.status(404).send("No task Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["done"];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    const task = await Task.findOne({ _id: req.params.id });
    updates.forEach(update => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
