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
      required: false,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isFirstLogin: {
      type: Boolean,
      default: true, // true when using temp token, false after setting real password
    },
    resetToken: {
      type: String,
      default: null, // for forgot-password flow
    },
  },
);

module.exports = mongoose.model("User", UserSchema);
