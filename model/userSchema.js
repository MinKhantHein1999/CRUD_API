const mongoose = require("mongoose");

const userlogin = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userlogin);
