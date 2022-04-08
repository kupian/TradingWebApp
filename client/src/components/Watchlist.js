import React from 'react'
import {Stack, Card} from 'react-bootstrap'

export default function Watchlist(props) {
  return (
    <Stack direction="horizontal">
        <Card className="mx-auto">
            <Card.Body>
                <Card.Title>{props.symbol}</Card.Title>
                <Card.Text>{props.price}</Card.Text>
            </Card.Body>
        </Card>
        <Card className="mx-auto">
            <Card.Body>
                <Card.Title>{props.symbol}</Card.Title>
                <Card.Text>{props.price}</Card.Text>
            </Card.Body>
        </Card>
        <Card className="mx-auto">
            <Card.Body>
                <Card.Title>{props.symbol}</Card.Title>
                <Card.Text>{props.price}</Card.Text>
            </Card.Body>
        </Card>
    </Stack>
  )
}
