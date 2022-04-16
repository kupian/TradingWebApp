import fetch from 'node-fetch';
import express from 'express';
import config from 'config';
import pg from 'pg';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';

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

// Get a player name
async function getPlayerName(email, lobbyCode, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`SELECT * FROM players WHERE accountemail = $1 AND lobbycode = $2`, [email, lobbyCode]).then(result => {
        client.end();
        if (result.rows.length > 0) {
            func(result.rows[0].name);
        }
        else {
            func("No name");
        }
    });
}

// Get messages for lobby or player
async function getMessages(lobbyCode, player, func) {
    const client = new Client(clientConfig);
    await client.connect();
    if (player) {
        client.query(`SELECT * FROM messages WHERE lobbycode = $1 AND player = $2`, [lobbyCode, player]).then(result => {
            client.end();
            func(result.rows);
        });
    }
    else {
        client.query(`SELECT * FROM messages WHERE lobbycode = $1`, [lobbyCode]).then(result => {
            client.end();
            func(result.rows);
        });
    }
}

async function newMessage(lobbyCode, player, message, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`INSERT INTO messages (lobbycode, player, message) VALUES ($1, $2, $3)`, [lobbyCode, player, message]).then(result => {
        func(result);
        client.end();
    });
}

async function changeLobby(lobbyCode, email, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`UPDATE accounts SET lobby = $1 WHERE email = $2`, [lobbyCode, email]).then(result => {
        client.end();
        func(result);
    });
}

async function joinLobby(lobbyCode, email, name, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`INSERT INTO players (accountemail, lobbycode, name) VALUES ($1, $2, $3)`, [email, lobbyCode, name]).then(result => {
        client.end();
        func(result);
    });
}

async function updateUserName(email, username, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`SELECT * FROM accounts WHERE username = $1`, [username]).then(result => {
        if (result.rows.length > 0) {
            func(false);
        }
        else {
            client.query(`UPDATE accounts SET username = $1 WHERE email = $2`, [username, email]).then(result => {
                client.end();
                func(true);
            });
        }
    });
}

async function login(username, password, func) {
    const client = new Client(clientConfig);
    await client.connect();
    client.query(`SELECT * FROM accounts WHERE username = $1`, [username]).then(result => {
        client.end();
        if (result.rows.length > 0) {
            bcrypt.compare(password, result.rows[0].passwordhash, (err, res) => {
                if (res) {
                    func(true, result.rows[0].token);
                }
                else {
                    func(false, "");
                }
            });
        }
    });
}

async function register(username, email, hash, func) {
    const salt = await bcrypt.genSalt(10);
    const token = await bcrypt.hash(email, salt);

    if (username.length > 0 && username.length < 20) {
        const client = new Client(clientConfig);
        client.connect();
        client.query(`INSERT INTO accounts (email, username, token, passwordhash) VALUES ($1, $2, $3, $4)`, [email, username, token, hash]).then(data => {
            client.end();
            func({ success: true, token: token });
        });
    }
    else {
        func({ success: false, message: "Username must be between 1 and 20 characters" });
    }
}

app.post("/api/update-username", jsonparser, (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    updateUserName(email, username, result => {
        res.send({ allowed: result });
    });
})

app.post("/api/change-lobby", jsonparser, (req, res) => {
    const lobbyCode = req.body.lobbyCode;
    const email = req.body.email;
    changeLobby(lobbyCode, email, result => {
        res.send(result);
    });
})

app.post("/api/join-lobby", jsonparser, (req, res) => {
    const lobbyCode = req.body.lobbyCode;
    const name = req.body.name;
    const email = req.body.email;
    joinLobby(lobbyCode, email, name, result => {
        res.send(result);
    });
})

// Message route for lobby or player
app.post("/api/messages", jsonparser, (req, res) => {
    const lobbyCode = req.body.lobbyCode;
    let player = false;
    if (req.body.player) {
        player = req.body.player;
    }
    getMessages(lobbyCode, player, (messages) => {
        res.send(messages)
    });
});

app.post("/api/new-message", jsonparser, (req, res) => {
    const lobbyCode = req.body.lobbyCode;
    const player = req.body.player;
    const message = req.body.message;
    newMessage(lobbyCode, player, message, (result) => {
        res.send(result);
    });
});


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

app.post("/api/login", jsonparser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    login(username, password, (result, token) => {
        res.send({ success: result, token: token });
    });
})

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
        const token = req.body.token;
        if (token) {
            const client = new Client(clientConfig);
            client.connect();
            client.query(`SELECT * FROM accounts WHERE token = $1`, [token]).then(data => {
                client.end();
                res.send(JSON.stringify(data.rows[0]));
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

app.post("/api/register", jsonparser, (req, res) => {
    try {
        const email = req.body.email;
        const username = req.body.username;
        const hash = req.body.hash;
        register(username, email, hash, (result) => {
            res.send(result);
        });
    } catch (error) {
        console.log(error)
    }
});


// Get a player name from their account email and lobby code
app.post("/api/get-player-name", jsonparser, (req, res) => {
    const email = req.body.email;
    const lobbyCode = req.body.lobbyCode;
    getPlayerName(email, lobbyCode, (name) => {
        console.log("Sending player " + name);
        res.send({ "name": name });
    });
});

app.post("/api/get-players", jsonparser, (req, res) => {
    try {
        const email = req.body.email;
        if (email) {
            const client = new Client(clientConfig);
            client.connect();
            client.query(`SELECT * FROM players WHERE accountemail = $1`, [email]).then(data => {
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