import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TaskList from "./components/TaskList";
import { fetchTasks, createTask, deleteTask, toggleTask } from "./api";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await fetchTasks();
      setTasks(data);
    };
    load();
  }, []);

  const handleAdd = async (task) => {
    const { data } = await createTask(task);
    setTasks([...tasks, data]);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleToggle = async (id) => {
    const { data } = await toggleTask(id);
    setTasks(tasks.map(t => (t._id === id ? data : t)));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <Header />
      <InputForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}
