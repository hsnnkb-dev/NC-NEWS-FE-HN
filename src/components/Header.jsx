import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <header className="Header">
      <h1>Yesterday's <br></br> News</h1>
      <hr />
      <div className="Login">
        <img src={currentUser.avatar_url} alt={`${currentUser.username} profile`} />
        <p>Logged in as <span>{currentUser.username}</span></p>              
        <p>Hello {currentUser.name}</p>
      </div>
    </header>
  )
}