interface Task {
  taskName: string;
  description: string;
}

interface TaskTableProps {
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (index: number) => void;
  onDeleteTask: (index: number) => void;
}

export const TaskTable = ({ tasks, onAddTask, onEditTask, onDeleteTask }: TaskTableProps) => {
  return (
    <div className="task-container">
      <div className="task-header">
        <h2>Tasks</h2>
        <button className="btn btn-primary" onClick={onAddTask}>
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
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
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td className="actions">
                  <button className="btn btn-green" onClick={() => onEditTask(index)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteTask(index)}
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