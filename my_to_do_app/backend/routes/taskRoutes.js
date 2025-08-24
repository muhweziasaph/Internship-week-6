const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// GET all tasks (exclude __v)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({}, { __v: 0 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add new task with sequential _id
router.post("/", async (req, res) => {
  try {
    // Find the task with the highest _id
    const lastTask = await Task.findOne().sort({ _id: -1 });
    const nextId = lastTask ? (parseInt(lastTask._id) + 1).toString() : "1";

    const { title } = req.body;
    const task = new Task({ _id: nextId, title, completed: false });

    const savedTask = await task.save();

    // Remove __v from response
    const taskObj = savedTask.toObject();
    delete taskObj.__v;

    res.status(201).json(taskObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT toggle completed
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    const updatedTask = await task.save();

    const taskObj = updatedTask.toObject();
    delete taskObj.__v;

    res.json(taskObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
