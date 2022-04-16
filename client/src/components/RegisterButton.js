import React from 'react'
import { Nav } from 'react-bootstrap';

export default function RegisterButton(props) {

  return (
    <Nav.Link onClick={() => props.setRegisterModal(true)}>Register</Nav.Link>  
  )
}
