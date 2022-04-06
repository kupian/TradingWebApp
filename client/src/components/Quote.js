import { React, useEffect, useState } from 'react';
import "./Quote.css";

export default function Quote(props) {

    const IEX_KEY = process.env.REACT_APP_IEX_KEY;
    const [price, setPrice] = useState();

    async function getStockData(symbol) {
        const url = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect( () => {
        if (props.symbol) {
            console.log("MAKING REQUEST!!!!");
            getStockData(props.symbol).then(data => {
                setPrice(data.latestPrice);
            });
        }
    }, [props.symbol]);

  return (
    <div>
        <p className="lead money">{price}</p>
    </div>
  )
}
