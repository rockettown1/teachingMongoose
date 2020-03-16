const express = require("express");
require("./db/mongoose.js");
const { User } = require("./models/user.js");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
