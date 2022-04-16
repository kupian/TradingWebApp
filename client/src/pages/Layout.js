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
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [player, setPlayer] = useState("");
  const [lobbyCode, setLobbyCode] = useState("");
  const DEV_MODE = config["dev-mode"];
  let devMode;

  if (DEV_MODE) { devMode = <p id='dev-mode'>DEV MODE IS ACTIVE, ALL DATA IS FAKE</p>; }

  async function GetUser(token) {
    const res = await fetch("/api/get-user", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ token: token })
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

  // Set user info when cookie changes
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      GetUser(localStorage.getItem("usertoken")).then(result => {
        if (result.username) {
          console.log("user authenticated");
          setIsAuthenticated(true);
          setLobbyCode(result.lobby);
          setUser({name: result.username, email: result.email});
        }
        else {
          console.log("user not authenticated");
          setIsAuthenticated(false);
          setUser(null);
        }
      });
    }
  }, [localStorage.getItem("usertoken")]);


  return (
    <div>
    <Navigation GetUser={GetUser} GetPlayers={GetPlayers} lobbyCode={lobbyCode} setLobbyCode={setLobbyCode} user={user} player={player} isAuthenticated={isAuthenticated}/>
      {devMode}
      <Routes>
        <Route index element={<Home GetUser={GetUser} GetPlayers={GetPlayers} lobbyCode={lobbyCode} user={user}  player={player} isAuthenticated={isAuthenticated}/>} />
        <Route path="/lookup" element={<StockLookup />} />
        <Route path="/test2" element={<Test />} />
        <Route path="/profile" element={<Profile user={user} isAuthenticated={isAuthenticated}/>} />
      </Routes>
    </div>
  )
}
