import React from 'react'
import {Row, Col, Card, Container} from 'react-bootstrap'
import Watchlist from '../components/Watchlist'
import Leaderboard from '../components/Leaderboard'
import Portfolio from '../components/Portfolio'
import ChatFeed from '../components/ChatFeed'
import { useOutletContext } from 'react-router-dom'



export default function Home(props) {

  const [GetUser, GetPlayers, lobbyCode, user, isAuthenticated, isLoading] = useOutletContext();

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Leaderboard</Card.Title>
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
              <Card.Title>Chat Feed</Card.Title>
              <ChatFeed lobbyCode={lobbyCode}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
