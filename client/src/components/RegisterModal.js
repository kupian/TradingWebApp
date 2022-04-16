import { React, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import bcrypt from 'bcryptjs';

export default function RegisterModal(props) {

  const [usernameText, setUsernameText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [errorText, setErrorText] = useState("");


  async function handleSubmit() {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passwordText, salt);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ username: usernameText, hash: hash, email: emailText })
    })
    const data = await res.json();
    if (data.success) {
      setErrorText("");
      setUsernameText("");
      setPasswordText("");
      setEmailText("");
      localStorage.setItem("usertoken", data.token);
      props.setRegisterModal(false);
    }
    else {
      setErrorText(data.message);
      setUsernameText("");
      setPasswordText("");
      setEmailText("");
    }
  }


    function handleClose() {
      props.setRegisterModal(false);
    }

    function handleChange(e) {
      if (e.target.id === "username") setUsernameText(e.target.value);
      if (e.target.id === "password") setPasswordText(e.target.value);
      if (e.target.id === "email") setEmailText(e.target.value);
    }

    return (
      <Modal show={props.registerModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control id='email' value={emailText} onChange={handleChange} type="email" placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control id='username' value={usernameText} onChange={handleChange} type="text" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control id='password' value={passwordText} onChange={handleChange} type="password" placeholder="Enter Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
          {errorText}
        </Modal.Footer>
      </Modal>
    )
  }
