const mongoose = require("mongoose");

const {Schema} = mongoose;

const userScheme = new Schema({
  login: String,
  password: String,
  id: String
});

module.exports = User = mongoose.model("Users", userScheme);