import { useState } from "react";
import { addTask } from "../api";

export default function InputForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const { data } = await addTask({ title });
    onAdd(data);
    setTitle("");
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Add a task" />
      <button type="submit">+</button>
    </form>
  );
}
