import fetch from 'node-fetch';
import express from 'express';
import config from 'config';
import pg from 'pg';
import bodyParser from 'body-parser';

const jsonparser = bodyParser.json();

const Client = pg.Client;
const clientConfig = {
    host: "spaceinaball.ddns.net",
    user: "postgres",
    port: 5432,
    password: "easypassword4321",
    database: "tradingapp"
};
const DEV_MODE = config["dev-mode"];
const IEX_KEY = config["iex-key"];

const app = express();
const PORT = 80;

// Get the stock data from the API
async function getStockChartData(symbol) {
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/10d?token=${IEX_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getStockQuoteData(symbol) {
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

app.get("/api/quote", (req, res) => {
    try {
        if (DEV_MODE) res.send({ "price": Math.floor(Math.random() * 100) });
        else {
            if (req.query.symbol) {
                const symbol = req.query["symbol"];
                getStockQuoteData(symbol).then(data => {
                    res.send({ "price": data.latestPrice });
                })
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }

});

app.get("/api/chart", (req, res) => {
    try {
        if (DEV_MODE) res.send({});
        else {
            if (req.query.symbol) {
                const symbol = req.query["symbol"];
                getStockChartData(symbol).then(data => {
                    res.send({ "data": data });
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

app.post("/api/get-user", jsonparser, (req, res) => {
    try {
        const email = req.body.email;
        if (email) {
            const client = new Client(clientConfig);
            client.connect();
            client.query(`SELECT * FROM accounts WHERE email = $1`, [email]).then(data => {
                client.end();
                res.send(JSON.stringify(data.rows));
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

app.post("/api/new-user", jsonparser, (req, res) => {
    try {
        const email = req.body.email;
        if (email) {
            const client = new Client(clientConfig);
            client.connect();
            client.query(`INSERT INTO accounts (email) VALUES ($1)`, [email]).then(data => {
                client.end();
                res.send(JSON.stringify(data.rows));
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

app.post("/api/get-players", jsonparser, (req, res) => {
    try {
        const email = req.body.email;
        if (email) {
            const client = new Client(clientConfig);
            client.connect();
            client.query(`SELECT * FROM players WHERE accountid = (SELECT id FROM accounts WHERE email = $1)`, [email]).then(data => {
                client.end();
                res.send(JSON.stringify(data.rows));
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

app.post("/api/get-lobby", jsonparser, (req, res) => {
    try {
        const code = req.body.code;
        if (code) {
            const client = new Client(clientConfig);
            client.connect();
            client.query(`SELECT * FROM lobbies WHERE code = $1`, [code]).then(data => {
                client.end();
                res.send(JSON.stringify(data.rows));
            }).catch(error => {
                console.log(error);
                res.status(500).send(error);
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

app.listen(
    PORT,
    () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    }
);
