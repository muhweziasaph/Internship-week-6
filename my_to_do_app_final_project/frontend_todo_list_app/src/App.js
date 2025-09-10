import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SetPassword from "./components/SetPassword";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TaskList from "./components/TaskList";
import { getTasks, toggleTask, deleteTask } from "./api";

export default function App() {
  const [authed, setAuthed] = useState(!!localStorage.getItem("token"));
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const { data } = await getTasks(); // always array (backend fixed)
      setTasks(data);
    } catch (e) {
      console.log("Fetch tasks error:", e?.response?.data || e.message);
      if (e?.response?.status === 401) {
        localStorage.removeItem("token");
        setAuthed(false);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (authed) loadTasks();
  }, [authed]);

  const onLogout = () => {
    localStorage.removeItem("token");
    setAuthed(false);
    setTasks([]);
    navigate("/");
  };

  const handleToggle = async (id) => {
    const { data } = await toggleTask(id);
    setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // Protected App (task area)
  const TaskApp = () => (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <Header onLogout={onLogout} />
      <InputForm onAdd={(newTask) => setTasks((prev) => [newTask, ...prev])} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setAuthed={setAuthed} />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/app" element={authed ? <TaskApp /> : <AuthGate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function AuthGate() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto", textAlign:"center" }}>
      <p>You must log in to access the app.</p>
      <Link to="/login"><button>Go to Login</button></Link>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ maxWidth: 420, margin: "60px auto", textAlign:"center" }}>
      <h3>404 — Page not found</h3>
      <Link to="/"><button>Back Home</button></Link>
    </div>
  );
}
