import React from 'react'
import {NavLink} from 'react-router-dom'
import "./NavButton.css"

export default function Button(props) {
  return (
    <NavLink to={props.link} className="nav-button">{props.text}</NavLink>
  )
}
