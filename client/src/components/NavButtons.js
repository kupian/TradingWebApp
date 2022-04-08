import { React, useState, useEffect } from 'react'
import {Nav, Navbar} from 'react-bootstrap';
import NavButton from './NavButton';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";

export default function NavButtons(props) {
    const { isAuthenticated, isLoading } = useAuth0();
    const [userButtons, setUserButtons] = useState();

    useEffect(() => {
        if (isAuthenticated) {
            setUserButtons(<>
            <LogoutButton />
            <NavButton text="Profile" link="/profile" />
            <p className="ms-auto"></p>
            </>);
        } else {
            setUserButtons(<LoginButton />);
        }
    }, [isAuthenticated]);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
    <Nav>
      <NavButton text="Home" link="/" />
      <NavButton text="Lookup" link="/lookup" />
      {userButtons}
    </Nav>
  </Navbar>
  )
}
