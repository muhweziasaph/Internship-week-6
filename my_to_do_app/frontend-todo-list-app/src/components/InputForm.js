import { useState } from "react";

export default function InputForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = { _id: Date.now().toString(), title };
    onAdd(newTask);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", marginBottom: "10px" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add task..."
        style={{ flex: 1, padding: "5px" }}
      />
      <button type="submit" style={{ marginLeft: "5px" }}>Add</button>
    </form>
  );
}
