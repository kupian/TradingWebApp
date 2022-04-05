const app = require('express')();
const PORT = 80;

app.get("/", (req, res) => {
   res.send("Hello World");
});

app.listen(
    PORT,
    () => console.log(`Server listening on http://localhost:${PORT}`)
);