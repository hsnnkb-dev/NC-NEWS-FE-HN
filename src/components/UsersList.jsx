import { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api";
import UserCard from "./UserCard";

export default function UsersList() {
  const [ users, setUsers ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(response => {
        setUsers(response);
        setIsLoading(false)
      })
      .catch(() => setIsError(true))
  })

  if (isError) return <p className="Error">404 - Users not found</p>
  if (isLoading) return <p className="Loading">Loading content</p>

  return (
    <main className="UsersList">
      <h2>All Users - {users.length}</h2>
      <p>Login by clicking a username below</p>
      <section>
        {users.map(user => <UserCard user={user} key={user.username} />)}
      </section>
    </main>
  )
}