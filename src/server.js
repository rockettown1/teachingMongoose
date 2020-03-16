const express = require("express");
require("./db/mongoose.js");

const app = express();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
