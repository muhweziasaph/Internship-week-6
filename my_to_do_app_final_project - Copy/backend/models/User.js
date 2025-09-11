const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isFirstLogin: {
      type: Boolean,
      default: true, // stays true until user sets a real password
    },
    resetToken: {
      type: String,
      default: null, // used only for forgot/reset password
    },
  },
);

module.exports = mongoose.model("User", UserSchema);
