import { Link } from "react-router"
export const Header = () => {
    return (
    <div className="header">
      <h1 className="header-title">Task Manager App</h1>
      <Link to="/add-task" id="add-task-link">Add task</Link>
    </div>)
}