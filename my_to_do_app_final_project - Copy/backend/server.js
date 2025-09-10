const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve frontend build
const __root = path.resolve(); // points to project root
const frontendBuildPath = path.join(__root, "frontend_todo_list_app", "build");

app.use(express.static(frontendBuildPath));

// Any other route, serve React index.html
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
