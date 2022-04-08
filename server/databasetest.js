import fetch from 'node-fetch';

fetch("http://localhost:80/api/get-user", {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({email: "hello"})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });