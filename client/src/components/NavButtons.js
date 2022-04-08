import React from 'react'
import {Nav, Navbar} from 'react-bootstrap';
import NavButton from './NavButton';
import LogoutButton from './LogoutButton';

export default function NavButtons(props) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
    <Nav>
      <NavButton text="Home" link="/" />
      <NavButton text="Lookup" link="/lookup" />
      <LogoutButton />
    </Nav>
    <Nav>
      {props.settings}
    </Nav>
  </Navbar>
  )
}
