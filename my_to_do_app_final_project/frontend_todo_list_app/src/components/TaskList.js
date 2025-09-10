import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!Array.isArray(tasks)) return <p>No tasks yet.</p>;
  if (tasks.length === 0) return <p>No tasks yet. Add one!</p>;

  return (
    <div>
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
