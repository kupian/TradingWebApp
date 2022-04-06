import React from 'react'
import "./NavButton.css"

export default function Button(props) {
  return (
    <a href={props.href} className="nav-button">{props.text}</a>
  )
}
