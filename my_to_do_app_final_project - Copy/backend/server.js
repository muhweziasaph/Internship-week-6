const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.get("/", (_req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve frontend build
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "frontend_todo_list_app", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname1, "frontend_todo_list_app", "build", "index.html"));
});

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  })
  .catch((err) => console.error(" MongoDB connection error:", err));
