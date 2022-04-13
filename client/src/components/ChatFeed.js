import { React, useEffect, useState } from 'react'
import { Form, Button, Stack, Row, Col, FormControl } from 'react-bootstrap'


export default function ChatFeed(props) {

  const [messageList, setMessageList] = useState([]);

  async function getMessages(lobbyCode) {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ lobbyCode: lobbyCode })
    });
    const messages = await res.json();
    const messagesWithNames = await addPlayerNames(messages);
    return messagesWithNames;
  }

  async function addPlayerNames(messages) {
    for (let i = 0; i < messages.length; i++) {
      getPlayerName(messages[i].accountid, messages[i].lobbycode).then(result => {
        messages[i].playername = result;
      });
      return messages;
    }
  }

  async function getPlayerName(accountID, lobbyCode) {
    const res = await fetch("/api/get-player-name", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        accountID: accountID,
        lobbyCode: lobbyCode
      })
    });
    const data = await res.json();
    return data.name;
  }

  useEffect(() => {
    if (props.lobbyCode) {
      getMessages(props.lobbyCode).then(messages => {
        if (messages) setMessageList(messages);
      });
    }
  }, [props.lobbyCode]);


  // A placeholder - needs another database table to store the chat messages and all that jazz
  //const messages = [{ sender: "pussy-slayer-9000", body: "hello" }, { sender: "urmum2003", body: "banana is good today" }, { sender: "cooldude901", body: "apple is shit" }, { sender: "xdkid21", body: "BUY CUMCOIN" }]

  return (
    <Stack>
      <Row>
        // This is the chat feed - needs to be populated with the messages from the database
        {messageList.map((message, i) => {
          console.log(message);
          return (
            <Row key={message.id}>
              <div className="bg-light border ms-auto">
                <strong>{message.playername}:</strong>{message.message}
              </div>
            </Row>)
        })}
      </Row>
      <Row>
        <Col>
          <Form.Control type="text" placeholder="Type a message..." />
        </Col>
        <Col>
          <Button variant="primary" type="submit">Submit</Button>
        </Col>
      </Row>
    </Stack>
  )
}
