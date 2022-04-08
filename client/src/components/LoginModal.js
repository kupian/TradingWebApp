import React from 'react'
import {Modal, Button} from 'react-bootstrap';
import LoginButton from './LoginButton';

export default function LoginModal(props) {
    return (
        <Modal show={props.modal} onHide={props.HideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" value={props.usernameText} onChange={props.HandleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.HideModal}>Close</Button>
                <LoginButton />
            </Modal.Footer>
        </Modal>
    )
}
