import { React, useEffect, useState } from 'react'
import { Form, Button, Stack, Row, Col, FormControl } from 'react-bootstrap'


export default function ChatFeed(props) {

  const [messageList, setMessageList] = useState([]);
  const [msgBoxVal, setMsgBoxVal] = useState('Enter a message...');

  async function getMessages(lobbyCode) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ lobbyCode: lobbyCode })
    });
    const messages = await res.json();
    return messages;
  }

  async function newMessage(lobbyCode, player, message) {
    const res = await fetch("/api/new-message", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ lobbyCode: lobbyCode, player: player, message: message })
    });
    return res
  }

  async function updateMessages(lobbyCode) {
    getMessages(props.lobbyCode).then(messages => {
      
      setMessageList(messages);
    });
  }

  function handleChange(e) {
    setMsgBoxVal(e.target.value);
  }

  function handleClick(e) {
    setMsgBoxVal("");
  }

  function handleSubmit() {
    if (props.isAuthenticated) {
      newMessage(props.lobbyCode, props.username, msgBoxVal).then(res => {
        setMsgBoxVal("Enter a message...");
        updateMessages(props.lobbyCode);
      });
    }
  }

  useEffect(() => {
    if (props.lobbyCode) {
      updateMessages(props.lobbyCode);
    }
  }, [props.lobbyCode]);


  // A placeholder - needs another database table to store the chat messages and all that jazz
  //const messages = [{ sender: "pussy-slayer-9000", body: "hello" }, { sender: "urmum2003", body: "banana is good today" }, { sender: "cooldude901", body: "apple is shit" }, { sender: "xdkid21", body: "BUY CUMCOIN" }]

  return (
    <Stack>
      <Row>
        // This is the chat feed - needs to be populated with the messages from the database
        {messageList.map(message => {
          return (
            <Row key={message.id}>
              <div className="bg-light border ms-auto">
                <strong>{message.player}:</strong> {message.message}
              </div>
            </Row>
          )
        }
        )}
      </Row>
      <Row>
        <Col>
          <Form.Control type="text" value={msgBoxVal} onClick={handleClick} onChange={handleChange} />
        </Col>
        <Col>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Col>
      </Row>
    </Stack>
  )
}
