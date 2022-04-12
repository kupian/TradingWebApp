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
const CACHE_TIMEOUT = config["cache-timeout"];

const app = express();
const PORT = 80;

// Get the stock data from the API
async function getStockChartData(symbol) {
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/10d?token=${IEX_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Get the stock data from the API
async function getStockQuoteData(symbol) {
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    updateStockCache(symbol, data.latestPrice);
    console.log("Price received for " + symbol + ": " + data.latestPrice);
    return data;
}

async function getCachedData(symbol, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`SELECT lastprice FROM stocks WHERE symbol = $1`, [symbol]).then(result => {
        client.end();;
        if (result.rows.length > 0) return func(result.rows[0]);
        else {
            return { lastPrice: 0 };
        }
    });
};

// Get data of last cached stock quote
async function getLastUpdate(symbol, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`SELECT lastupdate FROM stocks WHERE symbol = $1`, [symbol]).then(result => {
        client.end();
        if (result.rows.length > 0) {
            func(result.rows[0].lastupdate)
        }
        else {
            func(false);
        }
    });
}

// Update last cached stock quote
async function updateStockCache(symbol, price) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`SELECT * FROM stocks WHERE symbol = $1`, [symbol]).then(result => {
        const t = new Date(Date.now()).toISOString();
        if (result.rows.length === 0) {
            
            client.query(`INSERT INTO stocks (symbol, lastUpdate, lastPrice) VALUES ($1, $2, $3)`, [symbol, t, price], (err, result) => {
                if (err) throw err
                client.end();
            });
        }
        else {
            console.log("Updating stock " + symbol + " to current price " + price);
            client.query(`UPDATE stocks SET lastupdate = $1, lastprice = $2 WHERE symbol = $3`, [t, price, symbol], (err, result) => {
                if (err) throw err
                client.end();
            });
        }
    });
};

// Get stock quote
app.get("/api/quote", (req, res) => {
    if (DEV_MODE) res.send({ "price": Math.floor(Math.random() * 100) });
    else {
        const symbol = req.query.symbol;
        getLastUpdate(symbol, (result => {
            // If stock exists in cache
            if (result) {
                console.log("Stock " + symbol + " exists in cache");
                const datetime = result;
                const now = new Date();
                console.log("Last cache was at " + datetime);
                console.log("Current time is " + now);
                console.log("Time elapsed since cache: " + (now - datetime))
                // If the last update is more than CACHE_TIMEOUT seconds ago, get new data
                if (now - datetime > CACHE_TIMEOUT) {
                    console.log("Making new API call");
                    getStockQuoteData(symbol).then(result => {
                        res.send({ "price": result.latestPrice });
                    });
                }
                // Otherwise, return the cached data
                else {
                    console.log("Returning cached data");
                    getCachedData(symbol, (result => {
                        res.send({ "price": result.lastprice });
                    }));
                }
            }
            // If stock does not exist get new data and create it
            else {
                console.log("Stock " + symbol + " does not exist in cache");
                getStockQuoteData(symbol).then(result => {
                    res.send({ "price": result.latestPrice });
                });
            }
        }));
    }
}
);

// Get the stock data from the API
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

app.post("/api/get-user", jsonparser, (req, res,) => {
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