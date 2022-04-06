import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function Candlestick(props) {


    const IEX_KEY = process.env.REACT_APP_IEX_KEY;
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

    // Get the stock data from the API
    async function getStockData(symbol) {
        const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/10d?token=${IEX_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
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

    function buildChart(symbol) {
        getStockData(symbol).then(data => {
            updateChart(data);
        });
    }

    useEffect(() => {
        if (props.symbol) {
        console.log(props.symbol);
        buildChart(props.symbol);
    }}, [props.symbol])

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="candlestick"
                width={props.width}
                height={props.height} />
        </div>
    )
}
