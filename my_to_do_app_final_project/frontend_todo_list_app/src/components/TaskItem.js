export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0" }}>
      <span
        onClick={() => onToggle(task._id)}
        style={{ cursor: "pointer", textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}
