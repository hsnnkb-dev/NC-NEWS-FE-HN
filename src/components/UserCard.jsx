import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { toast } from 'react-hot-toast'; 
import { getByPlaceholderText } from "@testing-library/react";

export default function UserCard({ user }) {
  const { setCurrentUser } = useContext(UserContext);
  const toastStyle = {
    style: {
      fontWeight: 'bold',
      border: '2px solid black',
      borderRadius: 0,
      color: 'black',
      boxShadow: '0.2rem 0.2rem black',
      backgroundColor: '#FAF9F6',
    }
  }

  const chooseUser = () => {
    toast(`Logged in as ${user.username}`, toastStyle)
    setCurrentUser(user);
  }

  return (
    <article className="UserCard" onClick={() => chooseUser()}>
      <div>
        <h3>{user.username}</h3>
        <p>{user.name}</p>
      </div>
      <div>
        <img src={user.avatar_url} alt={`${user.username} avatar`} />
      </div>
    </article>
  )
}