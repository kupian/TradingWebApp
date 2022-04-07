import fetch from 'node-fetch';
import express from 'express';
import config from 'config';

const DEV_MODE = config["dev-mode"];
const IEX_KEY = process.env.IEX_KEY;

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
    console.log("sss");
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

app.listen(
    PORT,
    () => console.log(`Server listening on http://localhost:${PORT}`)
);