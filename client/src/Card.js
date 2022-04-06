import React, { useEffect } from 'react'

function fetchAPI() {
  fetch("/api")
  .then(res => res.json()
    .then(data => console.log(data)),
    err => console.log(err)
    );
}

export default function Card() {

  useEffect( () => {
    fetchAPI();
  }, [] )

  return (
    <div>Card</div>
  )
}
