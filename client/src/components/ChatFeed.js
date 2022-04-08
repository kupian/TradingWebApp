import React from 'react'
import {Form, Button, Stack, Row, Col, FormControl} from 'react-bootstrap'

// A placeholder - needs another database table to store the chat messages and all that jazz
const messages = ["hello","banana is good today","apple is shit"]

export default function ChatFeed() {
  return (
    <Stack>
        <Row>
        <div className="bg-light border ms-auto">{messages[0]}</div>
        <div className="bg-light border ms-auto">{messages[1]}</div>
        <div className="bg-light border ms-auto">{messages[2]}</div>
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
