import React from 'react'
import { Form, Button, Stack, Row, Col, FormControl } from 'react-bootstrap'


export default function ChatFeed() {

  // A placeholder - needs another database table to store the chat messages and all that jazz
  const messages = [{sender:"pussy-slayer-9000", body: "hello"}, {sender:"urmum2003", body: "banana is good today"}, {sender:"cooldude901", body: "apple is shit"}, {sender:"xdkid21", body: "BUY CUMCOIN"}]

  return (
    <Stack>
      <Row>
        // This is the chat feed - needs to be populated with the messages from the database
        {messages.map((message, i) => {
          return (
            <div key={i} className="bg-light border ms-auto"><strong>{message.sender}: </strong>{message.body}</div>
          )
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
