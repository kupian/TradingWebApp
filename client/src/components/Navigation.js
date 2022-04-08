import { React, useState, useEffect } from 'react'
import NavButton from './NavButton'
import { NavLink, NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import LoginModal from './LoginModal';
import NavButtons from './NavButtons';
import LogoutButton from './LogoutButton';

export default function NavbarComp() {
  const [settings, setSettings] = useState();
  const [modal, setModal] = useState();
  const [usernameText, setUsernameText] = useState("");
  const [username, setUsername] = useState("");

  function ShowModal() {
    console.log("showing modal");
    setModal(true);
  }

  function HideModal() {
    setModal(false);
  }

  function LogOut() {
    localStorage.removeItem("username");
    setUsername("");
  }

  function LogIn() {
    setUsername(usernameText);
    setModal(false);
    localStorage.setItem("username", usernameText);
    setUsernameText("");
  }

  function HandleChange(e) {
    setUsernameText(e.target.value);
  }

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  useEffect(function UpdateSettings() {
    if (username) {
      setSettings(
        <>
          <NavDropdown title="roomnameplaceholder" id="dropdown">
            <LinkContainer to="#">
              <NavDropdown.Item href="#">otherroomnameplaceholder</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown title={username}>
            <LinkContainer to="#">
              <NavDropdown.Item>Settings</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={() => LogOut()}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </>
      )
    }
    else {
      setSettings(<NavLink onClick={() => ShowModal()} className="nav-button">Login</NavLink>);
    }

  }, [username]);

  return (
    <>
      <div>
      <NavButtons settings={settings} />
      </div>
      <LoginModal modal={modal} LogIn={LogIn} HideModal={HideModal} ShowModal={ShowModal} HandleChange={HandleChange} usernameText={usernameText} />
    </>
  )
}
