import { React, useState, useEffect } from 'react';
import {Outlet} from 'react-router-dom';
import Navigation from '../components/Navigation';
import "./Layout.css";
//import config from 'config';

export default function Layout() {
  const DEV_MODE = true;//config["dev-mode"];
  const [username, setUsername] = useState("");
  let devMode;
  useEffect( () => {
    setUsername(localStorage.getItem("username"));
  }, []);

  if (DEV_MODE) { devMode = <p id='dev-mode'>DEV MODE IS ACTIVE, ALL DATA IS FAKE</p>; }


  return (
    <div>
      <Navigation username={username}/>
      {devMode}
      <Outlet username={username}/>
    </div>
  )
}
