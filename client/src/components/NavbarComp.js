import { React, useState, useEffect } from 'react'
import NavButton from './NavButton'
import { Nav, NavLink, Navbar, NavDropdown, Modal } from "react-bootstrap";
import { ReactComponent as BurgerSvg } from "../hamburger.svg";
import { LinkContainer } from 'react-router-bootstrap';

export default function NavbarComp() {
  const [settings, setSettings] = useState();
  const [login, setLogin] = useState();
  const [username, setUsername] = useState("");

  function LogOut() {
    localStorage.removeItem("username");
    setUsername("");
  }

  function LogIn() {
    setLogin(
      <>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
        </Modal.Dialog>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label for="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Username" />
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </form>
        </Modal.Body>
      </>
    )
  }

  useEffect( () => {
    setUsername(localStorage.getItem("username"));
  }, []);

  useEffect(function UpdateSettings() {
    if (username) {
    setSettings (
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
          <NavDropdown.Item onClick={LogOut}>Log Out</NavDropdown.Item>
        </NavDropdown>
        </>
        )
    }
    else {
      setSettings(<NavLink onClick={LogIn} className="nav-button">Login</NavLink>);
    }

  }, [username]);

  return (
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
      {login}
    </div>
  )
}
