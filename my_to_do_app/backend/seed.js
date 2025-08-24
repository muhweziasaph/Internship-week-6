const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Task = require("./models/Task");

dotenv.config();
connectDB();

const seedTasks = async () => {
  try {
    await Task.deleteMany();

    const tasks = [
      { _id: "1", title: "Learn React", completed: false },
      { _id: "2", title: "Build To-Do App", completed: false },
      { _id: "3", title: "Connect Backend & Frontend", completed: false },
      { _id: "4", title: "Test CRUD Operations", completed: false }
    ];

    await Task.insertMany(tasks);
    console.log("Tasks seeded successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedTasks();
