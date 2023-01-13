import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api";
import UserCard from "./UserCard";

export default function UsersList() {
  const [ users, setUsers ] = useState([]);
  useEffect(() => {
    fetchUsers()
      .then(response => setUsers(response))
  })

  return (
    <main className="UsersList">
      <h2>All Users - {users.length}</h2>
      {users.map(user => <UserCard user={user} key={user.username} />)}
    </main>
  )
}