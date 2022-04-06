import React from 'react'
import NavButton from './NavButton'
import Test from './test'
import {
  Link,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <Router>
      <Routes></Routes>
      <div>
        <nav>
            <NavButton text="Text1" link="/test"/>
            <NavButton text="Text2" link="/test"/>
        </nav>
      </div>
    </Router>

    <Switch>
      <Route path="/test">
        <Test />
      </Route>
    </Switch>
    </>
  )
}
