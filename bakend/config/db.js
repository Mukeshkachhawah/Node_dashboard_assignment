const mongoose = require("mongoose");
const mongodbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Databse Connected ");
  } catch (error) {
    console.log(error);
  }
};
module.exports = mongodbConnect;
