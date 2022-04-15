import { React, useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import NavButton from '../components/NavButton';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';
import RoomDropdown from '../components/RoomDropdown';

export default function Navigation(props) {

  // Register new user to db
  async function RegisterNewUser(email) {
    const res = await fetch("/api/new-user", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email: email })
    })
    const data = await res.json();
    return data;
  }

  // Set user buttons based on user login state
  useEffect(() => {
    if (props.isAuthenticated) {
      // Register user to db if not already
      props.GetUser(props.user.email).then(result => {
        if (result.length === 0) {
          RegisterNewUser(props.user.email).then(result => console.log(result));
        }
      });
    }
  }, [props.user]);

  if (props.isAuthenticated) {
    return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Nav>
          <NavButton text="Home" link="/" />
          <NavButton text="Lookup" link="/lookup" />
          <RoomDropdown lobbyCode={props.lobbyCode} setLobbyCode={props.setLobbyCode} GetUser={props.GetUser} GetPlayers={props.GetPlayers} user={props.user} />
          <NavButton text="Profile" link="/profile" />
          <p className="ms-auto"></p>
          <LogoutButton />
        </Nav>
      </Navbar>);
  }
  else {
    return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Nav>
          <NavButton text="Home" link="/" />
          <NavButton text="Lookup" link="/lookup" />
          <LoginButton />
        </Nav>
      </Navbar>);
  }
}

