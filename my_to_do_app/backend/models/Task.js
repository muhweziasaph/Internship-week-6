const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // manual ID
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model("Task", TaskSchema);
