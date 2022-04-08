import React from 'react'
import {Row, Col, Card, Container} from 'react-bootstrap'
import Watchlist from '../components/Watchlist'
import Leaderboard from '../components/Leaderboard'
import Portfolio from '../components/Portfolio'
import ChatFeed from '../components/ChatFeed'

export default function test() {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Leaderboard />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Watchlist symbol="AAPL" price="50"/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Portfolio />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <ChatFeed />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
