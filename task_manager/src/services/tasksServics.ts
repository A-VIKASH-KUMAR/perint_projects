import { BASE_URL } from "../utils/constants";
import { Task } from "../components/TaskTable";
export const createTask = async (task:Task) => {
  try {
    const task_create_response = await fetch(`${BASE_URL}/api/tasks`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body:JSON.stringify(task)
    });
    console.log("tasks", task_create_response);
    return task_create_response;
  } catch (error) {
    console.error("error occured in getTask service", error);
  }
};

export const getTasks = async (page:number, limit:number) => {
  try {
    const tasks = await fetch(`${BASE_URL}/api/tasks?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return tasks
  } catch (error) {
    console.error("error occoured to fetch tasks data", error);
    
  }
};


export const updateTask = async (task:Task) => {
  try {
    const tasks = await fetch(`${BASE_URL}/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body:JSON.stringify(task)
    });
    return tasks
  } catch (error) {
    console.error("error occoured to fetch tasks data", error);
    
  }
};

export const deleteTask = async  (taskId:string) => {
  try {
    const tasks = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return tasks
  } catch (error) {
    console.error("error occoured to fetch tasks data", error);
    
  }
}