import React from 'react'
import {Link} from 'react-router-dom'
import "./NavButton.css"

export default function NavButton(props) {
  return (
    <Link to={props.link} className="nav-button">{props.text}</Link>
  )
}
