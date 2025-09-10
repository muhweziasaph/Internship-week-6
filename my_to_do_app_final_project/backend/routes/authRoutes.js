const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Task = require("../models/Task");
require("dotenv").config();

const router = express.Router();

// nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Utility function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: '"Todo App " <no-reply@todoapp.com>', 
      to,
      subject,
      text,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Email send error:", err);
  }
};
// REGISTER — email + phone → send temp token (hashed in DB) and seed tasks for this user
router.post("/register", async (req, res) => {
  const { email, phone } = req.body;

  try {
    // 1. Check if user exists
    let existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Generate temporary token (6 digits)
    const tempToken = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("[DEV] First-time token for", email, "=>", tempToken);

    // 3. Hash token & create user
    const hashedTemp = await bcrypt.hash(tempToken, 10);
    const user = await User.create({ email, phone, password: hashedTemp });

    // 5. Email token to user
    await sendEmail(
      email,
      "Your First-Time Login Token",
      `Use this token to log in: ${tempToken}`
    );

    return res.json({
      message:
        "Registration successful. Check your email inbox (Mailtrap) for your first-time token.",
    });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});
// LOGIN — first-time token OR real password
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // password OR first-time token
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (user.isFirstLogin) {
      // token matched, but still needs to set password
      return res.json({ message: "First login, please set new password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// SET PASSWORD — after first login (or to convert from token to real password)
router.post("/set-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.isFirstLogin = false;
    user.resetToken = null;
    await user.save();

    return res.json({ message: "Password set successfully. You can now log in." });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// FORGOT PASSWORD — send reset token
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetToken = resetToken;
    await user.save();

    console.log("[DEV] Reset token for", email, "=>", resetToken);
    await sendEmail(email, "Your Password Reset Token", `Use this token to reset: ${resetToken}`);

    return res.json({ message: "Reset token sent to email" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// RESET PASSWORD — using the reset token
router.post("/reset-password", async (req, res) => {
  const { email, token, newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.resetToken !== token)
      return res.status(400).json({ message: "Invalid token" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.isFirstLogin = false;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
