import React from 'react'
import NavButton from './NavButton'

export default function Navbar() {
  return (
      <div>
        <nav>
            <NavButton text="Text1" href="/api"/>
            <NavButton text="Text2" href="/api"/>
        </nav>
      </div>
  )
}
