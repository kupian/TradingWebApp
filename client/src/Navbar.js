import React from 'react'
import NavButton from './NavButton'

export default function Navbar() {
  return (
      <div>
        <nav>
            <NavButton text="Home" link="/" />
            <NavButton text="Test" link="/test" />
        </nav>
      </div>
  )
}
