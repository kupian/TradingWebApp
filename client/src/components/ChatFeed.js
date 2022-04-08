import React from 'react'
import {Form, Button, Stack, Row, Col, FormControl} from 'react-bootstrap'

export default function ChatFeed(props) {
  return (
    <Stack>
        <Row>
        <div className="bg-light border ms-auto">{props.messages[0]}</div>
        <div className="bg-light border ms-auto">{props.messages[1]}</div>
        <div className="bg-light border ms-auto">{props.messages[2]}</div>
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
