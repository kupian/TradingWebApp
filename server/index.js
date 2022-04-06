const app = require('express')();
const PORT = 80;

app.get("/api", (req, res) => {
   res.send(JSON.stringify( { "text": "UWU" }));
});

app.listen(
    PORT,
    () => console.log(`Server listening on http://localhost:${PORT}`)
);