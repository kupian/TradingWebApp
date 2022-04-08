import { React, useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import NavButton from '../components/NavButton';
import LogoutButton from '../components/LogoutButton';
import LoginButton from '../components/LoginButton';
import RoomDropdown from '../components/RoomDropdown';
import { useAuth0 } from "@auth0/auth0-react";

export default function NavButtons(props) {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userButtons, setUserButtons] = useState();
  const [userEmail, setUserEmail] = useState();

  async function GetUser(email) {
    const res = await fetch("/api/get-user", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email: email })
    })
    const data = await res.json();
    return data;
  };

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

  useEffect(() => {
    if (isAuthenticated) {
      setUserEmail(user.email);

    } else {
      setUserButtons(<LoginButton />);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (userEmail) {
      GetUser(userEmail).then(result => {
        if (result.length === 0) {
          RegisterNewUser(userEmail).then(result => console.log(result));
        }
      });

      setUserButtons(<>
        <RoomDropdown GetUser={GetUser} email={userEmail} />
        <NavButton text="Profile" link="/profile" />
        <p className="ms-auto"></p>
        <LogoutButton />
      </>);
    }
  }, [userEmail]);

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
