import { React, useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap';

export default function RoomDropdown(props) {
    const [latestLobby, setLatestLobby] = useState("");
    const [otherLobbies, setOtherLobbies] = useState([
        <NavDropdown.Item key="1">No other lobbies. loner</NavDropdown.Item>]
    )

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

    // Set lobbies list when props.user changes
    useEffect(() => {
        if (props.user) {
            props.GetPlayers(props.user.email).then(result => {
                if (result.length > 0) {
                    setOtherLobbies([]);
                    result.map(player => {
                        GetLobby(player.lobbycode).then(lobby => {
                            setOtherLobbies(otherLobbies => [...otherLobbies, <NavDropdown.Item key={lobby.code}>{lobby.lobbyname}</NavDropdown.Item>]);

                        })
                        return null;
                    })
                }
            })
        }
    }, [props.user]);

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
            </NavDropdown>
        </>
    )
}
