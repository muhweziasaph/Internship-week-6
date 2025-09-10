const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Routes
const taskRoutes = require("./routes/taskRoutes.js");
app.use("/api/tasks", taskRoutes);

// Serve frontend build
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// Catch-all route (for React frontend)
app.use((req, res, next) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) next(err);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
