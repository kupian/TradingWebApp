import { React, useState, useEffect } from 'react'
import {Nav, Navbar} from 'react-bootstrap';
import NavButton from './NavButton';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";

export default function NavButtons(props) {
    const isAuthenticated = useAuth0();
    const [loginoutButton, setLoginoutButton] = useState();

    useEffect(() => {
        console.log(isAuthenticated.isAuthenticated);
        if (isAuthenticated.isAuthenticated) {
            setLoginoutButton(<LogoutButton />);
        } else {
            setLoginoutButton(<LoginButton />);
        }
    }, [isAuthenticated.isAuthenticated]);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
    <Nav>
      <NavButton text="Home" link="/" />
      <NavButton text="Lookup" link="/lookup" />
      {loginoutButton}
    </Nav>
  </Navbar>
  )
}
