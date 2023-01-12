import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="Header">
      <h1>Yesterday's <br></br> News</h1>
      <hr />
      <p>Logged in as '{user}'</p>
    </header>
  )
}