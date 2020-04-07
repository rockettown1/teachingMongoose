const mongoose = require("mongoose");

const connection = async () => {
  const uri =
    "mongodb+srv://username:password@practice-cluster-xldcz.mongodb.net/dansNewDB?retryWrites=true&w=majority";
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log("connection made");
  } catch (error) {
    console.log(error);
  }
};

connection();
