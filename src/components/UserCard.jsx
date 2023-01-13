import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function UserCard({ user }) {
  const { setCurrentUser } = useContext(UserContext);

  return (
    <article className="UserCard">
      <div>
        <h3 onClick={() => setCurrentUser(user)}>{user.username}</h3>
        <p>{user.name}</p>
      </div>
      <div>
        <img src={user.avatar_url} alt={`${user.username} avatar`} />
      </div>
    </article>
  )
}