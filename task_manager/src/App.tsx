import { Header } from "./components/Header";
import { AddTask } from "./components/AddTask";
import { TaskCard } from "./components/TaskCard";
import { Outlet, createBrowserRouter, useLoaderData, Link } from "react-router";
import { useState } from "react";

interface Task {
  taskName: string;
  description: string;
}

export const Home=  () => {
  const tasks = useLoaderData() as Task[];
  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. <Link to="/add-task">Add a task</Link></p>
      ) : (
        <div>
          {tasks.map((task, index) => (
            <TaskCard key={index} taskName={task.taskName} description={task.description} />
          ))}
        </div>
      )}
    </div>
  );
}
export function App() {
  return (
    <div>
      <Header />
      <Home/>
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
    path: "add-task",
    element: <AddTask />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const taskName = formData.get("taskName") as string;
      const description = formData.get("taskDescription") as string;
      
      const stored = localStorage.getItem("tasks");
      const tasks: Task[] = stored ? JSON.parse(stored) : [];
      tasks.push({ taskName, description });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      
      return { success: true };
    }
  }]
}]);

