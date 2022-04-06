import React from 'react'
import NavButton from './NavButton'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function NavbarComp() {
  return (
      <div>
      <Navbar bg="light" expand="lg">
        <Nav>
          <NavButton text="Home" link="/" />
          <NavButton text="Lookup" link="/lookup" />
          <NavButton text="Test2" link="/test2" />
        </Nav>
      </Navbar>
      </div>
  )
}
