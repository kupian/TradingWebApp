import { React, useState, useEffect } from 'react';
import {Outlet} from 'react-router-dom';
import Navigation from '../pages/Navigation';
import "./Layout.css";
import config from 'config';
import { useAuth0 } from "@auth0/auth0-react";

export default function Layout() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [lobbyCode, setLobbyCode] = useState("");
  const DEV_MODE = config["dev-mode"];
  let devMode;

  if (DEV_MODE) { devMode = <p id='dev-mode'>DEV MODE IS ACTIVE, ALL DATA IS FAKE</p>; }

  async function GetUser(email) {
    const res = await fetch("/api/get-user", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email: email })
    })
    const data = await res.json();
    return data;
  };

  async function GetPlayers(email) {
    const res = await fetch("/api/get-players", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ email: email })
    })
    const data = await res.json();
    return data;
}

  // Set lobby code when user changes
  useEffect(() => {
    if (isAuthenticated) {
      GetUser(user.email).then(result => {
        if (result.length > 0) {
          setLobbyCode(result[0].lobby);
        }
      });
    }
  }, [user]);


  return (
    <div>
      <Navigation GetUser={GetUser} GetPlayers={GetPlayers} lobbyCode={lobbyCode} user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} />
      {devMode}
      <Outlet context={[GetUser, GetPlayers, lobbyCode, user, isAuthenticated, isLoading]} />
    </div>
  )
}
