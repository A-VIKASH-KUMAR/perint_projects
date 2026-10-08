import { Header } from "./components/Header";
import { TaskTable } from "./components/TaskTable";
import { TaskModal } from "./components/TaskModal";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import {
  Outlet,
  createBrowserRouter,
  useLoaderData,
  Navigate,
} from "react-router";
import { useEffect, useState } from "react";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "./services/tasksServics";
import { Task } from "./components/TaskTable";

interface TasksResponse {
  data: Task[];
}

export const Home = () => {
  const userId = JSON.parse(localStorage.getItem("currentUser")!).id;
  const initialTasks: Task[] = [
    {
      id: "",
      title: "",
      description: "",
      status: "",
      dueDate: "",
      assignees: [userId],
    },
  ];
  const loadTasks = async (page:number, offset:number) => {
    const response = await getTasks(page,offset);
    if (response?.ok) {
      const tasksData: TasksResponse = await response.json();
      setTasks(tasksData.data);
      return tasksData.data;
    }
    return [];
  };
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [currentPage, setCurrentpage] = useState(1)
  const [itemsPerPage] = useState(10)
  const offset = itemsPerPage * (currentPage-1)
  useEffect(() => {
    loadTasks(currentPage, itemsPerPage*currentPage);
  }, []);
  const handleAddTask = async (title: string, description: string) => {
    if (editingTaskId === null) {
      const response = await createTask({ title, description });
      if (!response?.ok) {
        return;
      }
      const taskData: Task = await response.json();
      const updatedTasks = [...tasks, taskData];
      setTasks(updatedTasks);
    } else {
      // const existingTask = tasks[editingTaskIndex];
      const response = await updateTask({
        id: editingTaskId,
        title,
        description,
      });
      if (!response?.ok) {
        return;
      }
      let taskData = await loadTasks(currentPage, offset)
      setTasks(taskData);
    }
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const handleEditTask = (id: string) => {
    setEditingTaskId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTaskId(null);
  };

  const handleDeleteTask = async (id: string) => {
    const deleteResponse = await deleteTask(id);
    const tasks = await loadTasks(currentPage, offset);
    setTasks(tasks);
  };

  return (
    <div>
      <TaskTable
        tasks={tasks}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onAddTask={() => setIsModalOpen(true)}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
        initialValues={
          editingTaskId === null
            ? undefined
            : (() => {
                const task = tasks.find(({ id }) => id === editingTaskId);
                return task
                  ? {
                      title: task.title,
                      description: task.description ?? "",
                    }
                  : undefined;
              })()
        }
        isEditing={editingTaskId !== null}
      />
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: () => {
      const stored = localStorage.getItem("tasks");
      return stored ? JSON.parse(stored) : [];
    },
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <ProtectedRoute>
            <div>Use the Add Task button on the home page</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
]);
