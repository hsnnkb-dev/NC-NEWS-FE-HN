import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { currentUser } = useContext(UserContext);

  return (
    <header className="Header">
      <h1>Yesterday's <br></br> News</h1>
      <div className="Profile">
        <img src={currentUser.avatar_url} alt={`${currentUser.username} profile`} />
        <p><span>{currentUser.username}</span></p>
      </div>
    </header>
  )
}