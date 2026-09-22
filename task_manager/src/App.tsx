import { Header } from "./components/Header";
import { TaskTable } from "./components/TaskTable";
import { TaskModal } from "./components/TaskModal";
import { Outlet, createBrowserRouter, useLoaderData } from "react-router";
import { useState } from "react";

interface Task {
  taskName: string;
  description: string;
}

export const Home = () => {
  const initialTasks = useLoaderData() as Task[];
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  const handleAddTask = (taskName: string, description: string) => {
    const updatedTasks =
      editingTaskIndex === null
        ? [...tasks, { taskName, description }]
        : tasks.map((task, index) =>
            index === editingTaskIndex ? { ...task, description } : task
          );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setIsModalOpen(false);
    setEditingTaskIndex(null);
  };

  const handleEditTask = (index: number) => {
    setEditingTaskIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTaskIndex(null);
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <TaskTable
        tasks={tasks}
        onAddTask={() => setIsModalOpen(true)}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
        initialValues={
          editingTaskIndex === null
            ? undefined
            : tasks[editingTaskIndex]
        }
        isEditing={editingTaskIndex !== null}
      />
    </div>
  );
};

export function App() {
  return (
    <div>
      <Header />
      <Home />
      <Outlet />
    </div>
  );
}

export const routes = createBrowserRouter([{
  path: "/",
  element: <App />,
  loader: () => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  },
  children: [{
    path: "/add-task",
    element: <div>Use the Add Task button on the home page</div>,
  }]
}]);