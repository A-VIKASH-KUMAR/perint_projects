import { Form, useActionData, useNavigate } from "react-router";
import { useEffect } from "react";

export const AddTask = () => {
  const actionData = useActionData() as { success: boolean } | undefined;
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      navigate("/");
    }
  }, [actionData, navigate]);

  return (
    <Form action="/add-task" method="post">
      <h1>Add Task</h1>
      <div>
        <label htmlFor="task-name">Task Name:</label>
        <input type="text" name="taskName" id="task-name" required />
      </div>
      <div>
        <label htmlFor="task-description">Description:</label>
        <input type="text" name="taskDescription" id="task-description" required />
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
};