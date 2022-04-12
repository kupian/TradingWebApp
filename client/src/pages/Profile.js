import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export default function Profile() {
    const { user, isAuthenticated, isLoading } = [props.user, props.isAuthenticated, props.isLoading];

    if (isLoading) return (<div>Loading...</div>);

    if (!isAuthenticated) return (<div>You are not logged in.</div>);

  return (
    <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </div>
  )
}
