import { React, useState, useEffect } from 'react'
import NavButton from './NavButton'
import { Nav, NavLink, Navbar, NavDropdown, Modal, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

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
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
          <Nav>
            <NavButton text="Home" link="/" />
            <NavButton text="Lookup" link="/lookup" />
            <NavButton text="Test2" link="/test2" />
          </Nav>
          <Nav>
            {settings}
          </Nav>
        </Navbar>
      </div>
      <Modal show={modal} onHide={HideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" value={usernameText} onChange={HandleChange}/>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => HideModal()}>Close</Button>
          <Button variant="primary" onClick={() => LogIn()}>Log In</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
