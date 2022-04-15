import { React, useState } from 'react'
import { Form } from 'react-bootstrap'

export default function Profile(props) {

  const [newUsername, setNewUsername] = useState("");

  function handleChange(e) {
    setNewUsername(e.target.value);
  }

  async function updateUsername() {
    const res = await fetch('/api/update-username', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ email: props.user.email, username: newUsername })
    });
    const data = await res.json();
    if (!data.allowed) alert("Username already taken");
    else {
      props.setUsername(newUsername);
    }
    setNewUsername("");
  }

if (props.isLoading) return (<div>Loading...</div>);

if (!(props.isAuthenticated)) return (<div>You are not logged in.</div>);

return (
  <div>
    <img src={props.user.picture} alt={props.user.name} />
    <h2>{props.username}</h2>
    <p>{props.user.email}</p>

    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Change Username</Form.Label>
        <Form.Control id='code' value={newUsername} onChange={handleChange} type="text" placeholder="New Username..." />
      </Form.Group>
    </Form>
    <button className="btn btn-primary" onClick={updateUsername}>Update</button>
  </div>
)
}
