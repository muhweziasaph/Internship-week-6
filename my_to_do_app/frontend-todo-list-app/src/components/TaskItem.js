export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", margin: "5px 0" }}>
      <span
        onClick={() => onToggle(task._id)}
        style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}
