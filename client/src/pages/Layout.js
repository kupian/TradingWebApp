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

  return (
    <div>
      <Navigation />
      {devMode}
      <Outlet/>
    </div>
  )
}
