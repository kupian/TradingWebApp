import { React, useState, useEffect } from 'react'
import { Nav, Navbar, Container, Modal, Form, Button } from 'react-bootstrap';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import NavButton from '../components/NavButton';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';
import RoomDropdown from '../components/RoomDropdown';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import RegisterButton from '../components/RegisterButton';

export default function Navigation(props) {

  const [registerModal, setRegisterModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  // Set user buttons based on user login state

  if (props.isAuthenticated) {
    return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Nav className="container-fluid">
          <NavButton text="Home" link="/" />
          <NavButton text="Lookup" link="/lookup" />
          <RoomDropdown lobbyCode={props.lobbyCode} setLobbyCode={props.setLobbyCode} GetUser={props.GetUser} GetPlayers={props.GetPlayers} user={props.user} />
          <LinkContainer to="/profile">
            <Navbar.Brand className="ms-auto">
              {props.user.name}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Brand>Lobby Code: {props.lobbyCode}</Navbar.Brand>
          <LogoutButton />
        </Nav>
      </Navbar>);
  }
  else {
    return (
      <>
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
          <Nav>
            <NavButton text="Home" link="/" />
            <NavButton text="Lookup" link="/lookup" />
            <LoginButton setLoginModal={setLoginModal} />
            <RegisterButton setRegisterModal={setRegisterModal} />
          </Nav>
        </Navbar>

        <LoginModal loginModal={loginModal} setLoginModal={setLoginModal}/>
        <RegisterModal registerModal={registerModal}  setRegisterModal={setRegisterModal}/>
      </>
        );
  }
}