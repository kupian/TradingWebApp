import React from 'react'
import {Link} from 'react-router-dom'
import "./NavButton.css"

export default function Button(props) {
  return (
    <Link to={props.link} className="nav-button">{props.text}</Link>
  )
}
