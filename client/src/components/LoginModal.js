import { React, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import bcrypt from 'bcryptjs';

export default function LoginModal(props) {

    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");
    const [errorText, setErrorText] = useState("");

    async function login(username, password) {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ username: username, password: password })
        }
        );
        const data = await res.json();
        console.log(data);
        if (data.success) {
            localStorage.setItem("usertoken", data.token);
            console.log("login successful");
            setErrorText("");
            handleClose();
        }
        else {
            setErrorText("Invalid username or password");
            setUsernameText("");
            setPasswordText("");
        }
    }

    function handleClose() {
        props.setLoginModal(false);
    }

    function handleSubmit() {
        login(usernameText, passwordText);
    }

    function handleChange(e) {
        if (e.target.id === "username") setUsernameText(e.target.value);
        if (e.target.id === "password") setPasswordText(e.target.value);
    }

    return (
        <Modal show={props.loginModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
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
                    Login
                </Button>
                {errorText}
            </Modal.Footer>
        </Modal>
    )
}
