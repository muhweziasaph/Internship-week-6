const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String }, // hashed (or temp first-time token hashed)
    isFirstLogin: { type: Boolean, default: true },
    resetToken: { type: String, default: null }
  },
);

module.exports = mongoose.model("User", userSchema);
