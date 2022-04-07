import { React, useEffect, useState } from 'react';
import "./Quote.css";

export default function Quote(props) {


    const [price, setPrice] = useState();

    async function fetchPrice(symbol) {
        const url = `/api/quote?symbol=${symbol}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect( () => {
        if (props.symbol) {
            fetchPrice(props.symbol).then(data => {
                setPrice("$"+data.price);
            });
        }
    }, [props.symbol]);

  return (
    <div>
        <p className="lead money">{price}</p>
    </div>
  )
}
