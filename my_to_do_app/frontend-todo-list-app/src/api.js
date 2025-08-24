import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const toggleTask = (id) => API.put(`/tasks/${id}`);
