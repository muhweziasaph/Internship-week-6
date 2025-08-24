import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}
