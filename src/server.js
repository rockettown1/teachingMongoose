const express = require("express");
require("./db/mongoose.js");
const userRouter = require("./routes/user-routes.js");
const taskRouter = require("./routes/task-routes.js");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
