import { React, useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap';

export default function RoomDropdown(props) {
    const [user, setUser] = useState();
    const [latestLobby, setLatestLobby] = useState("No Lobby");
    const [otherLobbies, setOtherLobbies] = useState([
        <NavDropdown.Item key="1">No other lobbies. loner</NavDropdown.Item>]
    )

    async function GetPlayers(email) {
        const res = await fetch("/api/get-players", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ email: email })
        })
        const data = await res.json();
        return data;
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

    useEffect(() => {
        props.GetUser(props.email).then(result => {
            setUser(result[0]);
        });
    }, [props.email]);

    useEffect(() => {
        if (user) {
            if (user.latestLobby) setLatestLobby(user.latestLobby);
            GetPlayers(props.email).then(result => {
                if (result.length > 0) {
                    setOtherLobbies([]);
                    result.map(player => {
                        GetLobby(player.lobbycode).then(lobby => {
                            setOtherLobbies(otherLobbies => [...otherLobbies, <NavDropdown.Item key={lobby.code}>{lobby.lobbyname}</NavDropdown.Item>]);
                        })
                    })
                }
            })
        }
    }, [user]);

    return (
        <NavDropdown title={latestLobby} id="basic-nav-dropdown">
            {otherLobbies}
        </NavDropdown>
    )
}
