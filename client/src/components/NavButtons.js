import React from 'react'
import {Nav, Navbar} from 'react-bootstrap';
import NavButton from './NavButton';

export default function NavButtons(props) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
    <Nav>
      <NavButton text="Home" link="/" />
      <NavButton text="Lookup" link="/lookup" />
      <NavButton text="Test2" link="/test2" />
    </Nav>
    <Nav>
      {props.settings}
    </Nav>
  </Navbar>
  )
}
