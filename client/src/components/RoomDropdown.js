import { React, useEffect, useState } from 'react'
import { NavDropdown, Modal, Button, Form } from 'react-bootstrap';

export default function RoomDropdown(props) {
    const [latestLobby, setLatestLobby] = useState("Lobby Code...");
    const [joinCode, setJoinCode] = useState("");
    const [show, setShow] = useState(false);
    const [otherLobbies, setOtherLobbies] = useState([
        <NavDropdown.Item key="1">No other lobbies. loner</NavDropdown.Item>]
    )

    function handleClose() {
        setShow(false);
    }

    function handleOpen() {
        setShow(true);
    }

    async function GetLobby(code) {
        const res = await fetch("/api/get-lobby", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ code: code })
        })
        const data = await res.json();
        return data[0];
    }

    async function changeLobby(code) {
        const res = await fetch("/api/change-lobby", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: props.user.email, lobbyCode: code })
        })
        props.setLobbyCode(code);
        return res;
    }

    function handleChange(e) {
        if (e.target.id === "code") setJoinCode(e.target.value);
    }

    async function handleSubmit() {
        const res = await fetch("/api/join-lobby", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: props.user.email, lobbyCode: joinCode })
        })
        props.setLobbyCode(joinCode);
        setJoinCode("");
        setShow(false);
    }

    // Set lobbies list when props.user changes
    useEffect(() => {
        if (props.user) {
            props.GetPlayers(props.user.email).then(result => {
                if (result.length > 0) {
                    setOtherLobbies([]);
                    result.map(player => {
                        if (player.lobbycode !== props.lobbyCode) {
                            GetLobby(player.lobbycode).then(lobby => {
                                setOtherLobbies(otherLobbies => [...otherLobbies, <NavDropdown.Item key={lobby.code} onClick={() => { changeLobby(lobby.code) }}>{lobby.lobbyname}</NavDropdown.Item>]);

                            })
                        }
                        return null;
                    })
                }
            })
        }
    }, [props.lobbyCode, props.user]);

    useEffect(() => {
        if (props.lobbyCode !== "") {
            GetLobby(props.lobbyCode).then(lobby => {
                setLatestLobby(lobby.lobbyname);
            })
        }
        else {
            setLatestLobby("No lobby");
        }
    }, [props.lobbyCode]);

    return (
        <>
            <NavDropdown title={latestLobby} id="basic-nav-dropdown">
                {otherLobbies}
                <button className="btn btn-primary" onClick={handleOpen}>Join Lobby</button>
            </NavDropdown>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Lobby</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Lobby Code</Form.Label>
                            <Form.Control id='code' value={joinCode} onChange={handleChange} type="text" placeholder="Enter lobby code" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
