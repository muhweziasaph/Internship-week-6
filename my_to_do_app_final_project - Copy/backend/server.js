// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// --- API routes ---
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Find frontend build (try multiple likely locations) 
const projectRoot = path.resolve(__dirname, ".."); // parent of backend/
const candidates = [
  path.join(projectRoot, "frontend_todo_list_app", "build"),
  path.join(projectRoot, "frontend", "build"),
  path.join(projectRoot, "frontend_todo_list_app", "frontend", "build"),
  path.join(projectRoot, "client", "build"),
  path.join(__dirname, "frontend", "build"), // backend/frontend/build (if ever)
];

let frontendBuildPath = null;
for (const p of candidates) {
  if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
    frontendBuildPath = p;
    break;
  }
}

if (frontendBuildPath) {
  console.log(" frontend from:", frontendBuildPath);
  app.use(express.static(frontendBuildPath));

  // Serve React app for any non-/api/* routes (RegExp avoids path-to-regexp pitfalls)
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  console.warn(" Frontend build NOT found. Running API-only mode.");
  // Root route for quick check
  app.get("/", (_req, res) => res.send("API is running"));
}

/* ---------- Database + Server Start ---------- */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    // Still start server in API-only mode so you can see logs
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT} (MongoDB NOT connected)`)
    );
  });
