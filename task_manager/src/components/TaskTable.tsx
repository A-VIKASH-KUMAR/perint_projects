export interface Task {
  id?: string;
  title: string;
  description: string;
  status?: string;
  dueDate?: string;
  assignees?: string[];
}
interface TaskTableProps {
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TaskTable = ({ tasks, onAddTask, onEditTask, onDeleteTask

 }: TaskTableProps) => {
  console.log("tasks", tasks);
  return (
    <div className="task-container">
      <div className="task-header">
        <h2>Tasks</h2>
        <button className="btn btn-primary" onClick={onAddTask}>
          Add Task
        </button>
      </div>
      
      {tasks?.length === 0 ? (
        <p className="empty-state">No tasks yet. Click "Add Task" to create one.</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td className="actions">
                  <button className="btn btn-green" onClick={() => onEditTask(task.id!)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteTask(task.id!)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};