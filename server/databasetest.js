import pg from 'pg';

const Client = pg.Client;
const client = new Client({
    host: "spaceinaball.ddns.net",
    user: "postgres",
    port: 5432,
    password: "easypassword4321",
    database: "tradingapp"});

client.connect();
client.query(`SELECT * FROM accounts`, (err, res) => {
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    client.end;
});