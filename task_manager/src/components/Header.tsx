import { LOGO_URL } from "../utils/constants"
export const Header = () => {
    return (
    <div className="header">
      <div className="logo">
        <img className="logo-image" src={LOGO_URL} />
      </div>
      <h1 className="header-title">Task Manager App</h1>
    </div>)
}