import React from 'react'
import "./NavButton.css"
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

export default function NavButton(props) {
  return (
    <LinkContainer to={props.link}>
      <Nav.Link>{props.text}</Nav.Link>
    </LinkContainer>
  )
}
