import { React, useState } from 'react';
import Chart from "react-apexcharts";

export default function StockChart(props) {

    const IEX_KEY = process.env.REACT_APP_IEX_KEY;

    // Get the stock data from the API
    async function getStockData(symbol) {
        const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/10d?token=${IEX_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    // Update stock symbol to input text field
    function handleChange(e) {
        setSymbol(e.target.value);
    }

    // Get stock data when button pressed and update chart
    function handleBtnClick() {
        getStockData(symbol).then(data => {
            console.log(data);
            updateChart(data);
        });
    }

    // Remove preceding 0s in date and convert to date format
    function convertDate(date) {
        let year = date.substring(0, 4);
        let month = date.substring(5, 7);
        let day = date.substring(8, 10);
        month = parseInt(month) - 1;
        day = parseInt(day);
        return new Date(year, month, day);
    }

    // Update chart with stock data
    function updateChart(stockData) {
        let data = [];
        for (let i = 0; i < stockData.length; i++) {
            let day = stockData[i];
            data.push({
                x: convertDate(day.date),
                y: [day.open, day.high, day.low, day.close]
            })
        }

        setSeries([{
            name: symbol,
            data: data
        }]);
    }

        const [symbol, setSymbol] = useState("");
        const [series, setSeries] = useState([{
            data: []
        }
        ]);
        const [options, setOptions] = useState({
            chart: {
                id: "candlestick"
            },
            xaxis: {
                type: "datetime",
            }
        });
        return (
            <div>stockChart
                <Chart
                    options={options}
                    series={series}
                    type="candlestick"
                    width="800"
                    height="200" />

                <input type="text" value={symbol} onChange={handleChange} />
                <button onClick={handleBtnClick}>Get stock data</button>
            </div>

        );
    }
