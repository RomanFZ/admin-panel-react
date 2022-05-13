const mongoose = require("mongoose");

const {Schema} = mongoose;

const receptionScheme = new Schema({
  name: String,
  doctor: String,
  date: Date,
  complaint: String,
  id: String,
  userId: String
});

module.exports = Reception = mongoose.model("Receptions", receptionScheme);