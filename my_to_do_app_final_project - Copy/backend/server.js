const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // needed for frontend serving
const bcrypt = require("bcryptjs");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve React Frontend
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "frontend_todo_list_app", "build")));

// Catch-all route to serve React for any non-API request
app.get(/^\/.*$/, (req, res) => {
  res.sendFile(
    path.join(__dirname1, "frontend_todo_list_app", "build", "index.html")
  );
});

// MongoDB Connection & Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
