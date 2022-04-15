import { React, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../pages/Navigation';
import "./Layout.css";
import config from 'config';
import { useAuth0 } from "@auth0/auth0-react";
import Home from '../pages/Home';
import Test from '../pages/Test';
import Profile from '../pages/Profile';
import StockLookup from '../pages/StockLookup';

export default function Layout() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [username, setUsername] = useState("");
  const [player, setPlayer] = useState("");
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
          setUsername(result[0].username);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      GetPlayers(user.email).then(result => {
        result.map(player => {
          if (player.lobbycode === lobbyCode) {
            setPlayer(player);
          }
        });
      })
    }
  }, [lobbyCode]);


  return (
    <div>
    <Navigation GetUser={GetUser} GetPlayers={GetPlayers} lobbyCode={lobbyCode} setLobbyCode={setLobbyCode} user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} player={player} username={username} setUsername={setUsername}/>
      {devMode}
      <Routes>
        <Route index element={<Home GetUser={GetUser} GetPlayers={GetPlayers} lobbyCode={lobbyCode} user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} player={player} username={username}/>} />
        <Route path="/lookup" element={<StockLookup />} />
        <Route path="/test2" element={<Test />} />
        <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated} isLoading={isLoading} username={username} setUsername={setUsername}/>} />
      </Routes>
    </div>
  )
}
