import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Nav } from 'react-bootstrap';

export default function LoginButton(props) {
    const {loginWithRedirect } = useAuth0();

  return (
    <Nav.Link onClick={() => props.setLoginModal(true)}>Log In</Nav.Link>  
  )
}
