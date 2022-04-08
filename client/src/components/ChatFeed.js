import React from 'react'
import { Form, Button, Stack, Row, Col, FormControl } from 'react-bootstrap'


export default function ChatFeed() {

  // A placeholder - needs another database table to store the chat messages and all that jazz
  const messages = ["hello", "banana is good today", "apple is shit", "BUY CUMCOIN"]


  messages.map(message => {
    <div className="bg-light border ms-auto">{message}</div>
  })

  return (
    <Stack>
      <Row>
        {messages.map((message, i) => {
          return (
            <div key={i} className="bg-light border ms-auto">{message}</div>
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
