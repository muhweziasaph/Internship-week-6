const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// All routes below require JWT
router.use(auth);

// GET all tasks for current user
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(tasks); // always return an array
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// CREATE a task
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const task = await Task.create({ title, user: req.user.id });
    return res.status(201).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// TOGGLE a task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    task.completed = !task.completed;
    await task.save();
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json({ message: "Task deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
