import { React, useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import NavButton from '../components/NavButton';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";

export default function NavButtons(props) {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userButtons, setUserButtons] = useState();

  async function CheckForRegisteredUser(email)
  {
    const res = await fetch("/api/get-user", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email: email })
    })
    const data = await res.json();
    return (data.length > 0) ? true : false;
    };

  async function RegisterNewUser(email)
  {
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

  useEffect(() => {
    if (isAuthenticated) {
      const email = user.email;
      CheckForRegisteredUser(email).then(result => {
        if (!result) {
          console.log("registering " + email);
          RegisterNewUser(email).then(result => console.log(result));
        }
      });

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
