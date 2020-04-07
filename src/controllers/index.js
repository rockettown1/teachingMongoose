const { Task } = require("../models/task");
const { User } = require("../models/user");

exports.postTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const response = await Task.find();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getTask = async (req, res) => {
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
};

exports.updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["done"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    const task = await Task.findOne({ _id: req.params.id });
    updates.forEach((update) => (task[update] = req.body[update]));

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

//user

exports.postUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await User.find({});
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getSingleUser = async (req, res) => {
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
};
