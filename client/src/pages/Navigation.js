import { React, useState, useEffect } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import NavButton from '../components/NavButton';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';
import RoomDropdown from '../components/RoomDropdown';

export default function Navigation(props) {

  // Register new user to db
  async function RegisterNewUser(email, username) {
    const res = await fetch("/api/new-user", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email: email, username: username })
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
          RegisterNewUser(props.user.email, props.user.name).then(result => {
            props.setUsername(props.user.name)
          }
          );
        }
      });
    }
  }, [props.user]);

  if (props.isAuthenticated) {
    return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Nav className="container-fluid">
          <NavButton text="Home" link="/" />
          <NavButton text="Lookup" link="/lookup" />
          <RoomDropdown lobbyCode={props.lobbyCode} setLobbyCode={props.setLobbyCode} GetUser={props.GetUser} GetPlayers={props.GetPlayers} user={props.user} />
          <LinkContainer to="/profile">
            <Navbar.Brand className="ms-auto">
              {props.username}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Brand>Lobby Code: {props.lobbyCode}</Navbar.Brand>
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

