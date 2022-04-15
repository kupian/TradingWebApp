import { React } from 'react'

export default function Profile(props) {

    if (props.isLoading) return (<div>Loading...</div>);

    if (!(props.isAuthenticated)) return (<div>You are not logged in.</div>);

  return (
    <div>
        <img src={props.user.picture} alt={props.user.name} />
        <h2>{props.user.name}</h2>
        <p>{props.user.email}</p>
    </div>
  )
}
