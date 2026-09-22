interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskName: string, description: string) => void;
  initialValues?: { taskName: string; description: string };
  isEditing?: boolean;
}

export const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
  isEditing = false,
}: TaskModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const taskName = (form.elements.namedItem('taskName') as HTMLInputElement).value;
    const description = (form.elements.namedItem('taskDescription') as HTMLInputElement).value;
    onSubmit(taskName, description);
    form.reset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              name="taskName"
              id="taskName"
              defaultValue={initialValues?.taskName ?? ""}
              readOnly={isEditing}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">Description:</label>
            <input
              type="text"
              name="taskDescription"
              id="taskDescription"
              defaultValue={initialValues?.description ?? ""}
              required
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {isEditing ? "Update Task" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};