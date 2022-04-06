import { React, useState } from 'react';
import Chart from "react-apexcharts";

export default function StockChart() {

    const IEX_KEY = process.env.REACT_APP_IEX_KEY;

    async function getStockData(symbol) {
    const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/5d?token=${IEX_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
    }

    function handleChange(e) {
        setSymbol(e.target.value);
    }

    function handleBtnClick() {
        getStockData(symbol).then(data => {
            console.log(data)
        });
    }

    const [symbol, setSymbol] = useState("");
    const [chart, setChart] = useState({
        options: {
            chart: {
                id: "candlestick"
            },
        },
        series: [{
            data: [{
                x: new Date(2022, 3, 4),
                y: [53.66, 54.99, 51.35, 52.95]
            },
            {
                x: new Date(2022, 3, 5),
                y: [52.95, 55.52, 50.78, 53.6]
            }]
        }]
    })
  return (
    <div>stockChart
        <Chart
            options={chart.options}
            series={chart.series}
            type="candlestick"
            width="800"
            height="200" />

            <input type="text" value={symbol} onChange={handleChange} />
            <button onClick={handleBtnClick}>Get stock data</button>
    </div>
    
  )
}
