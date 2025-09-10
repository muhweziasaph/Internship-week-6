const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Serve frontend (React build)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frontend_todo_list_app/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "frontend_todo_list_app", "build", "index.html"));
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
