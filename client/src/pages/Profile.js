import { React } from 'react'
import { useOutletContext } from "react-router-dom";

export default function Profile() {
  const [GetUser, GetPlayers, lobbyCode, user, isAuthenticated, isLoading] = useOutletContext();

    if (isLoading) return (<div>Loading...</div>);

    if (!isAuthenticated) return (<div>You are not logged in.</div>);

  return (
    <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </div>
  )
}
