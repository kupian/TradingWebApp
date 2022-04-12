import { React, useState, useEffect } from 'react';
import Candlestick from "../components/Candlestick";
import Quote from "../components/Quote";

export default function StockChart(props) {

    const [h3Text, seth3Text] = useState("");
    const [symbol, setSymbol] = useState("");
    const [symbolText, setSymbolText] = useState("");
    const [quoteClass, setQuoteClass] = useState("btn btn-primary active");
    const [chartClass, setChartClass] = useState("btn btn-warning");
    const [chartMode, setChartMode] = useState(false);
    const [selection, setSelection] = useState("");
    const [buttonText, setButtonText] = useState("Get Quote");

    // Get stock data when button pressed and update chart
    function handleDataClick() {
        setSymbol(symbolText);
    };

    function handleChange(event) {
        setSymbolText((event.target.value).toUpperCase());
    }

    function handleBtnClick(e) {
        if (e.target.id === "chartBtn") {
            setQuoteClass("btn btn-primary");
            setChartClass("btn btn-warning active");
            setButtonText("Show Chart");
            setChartMode(true);
            if (!chartMode) setSelection("");
        }
        else {
            setQuoteClass("btn btn-primary active");
            setChartClass("btn btn-warning warning");
            setButtonText("Get Quote");
            setChartMode(false);
            if (chartMode) setSelection("");
        }
    }

    useEffect( () => {
        seth3Text(symbol);
        if (chartMode) setSelection (<Candlestick height="200" width="800" symbol={symbol} />)
        else setSelection (<Quote symbol={symbol} />)
        setSymbolText("");
    }, [symbol]);

    return (
        <div>
            <h1 className="display-1">Stock Lookup</h1>
            <button id="quoteBtn" className={quoteClass} onClick={handleBtnClick}>Quote</button>
            <button id="chartBtn" className={chartClass} onClick={handleBtnClick}>Chart</button>
            <div>

                {selection}
                
                <h3>{h3Text}</h3>
                <input type="text" value={symbolText} onChange={handleChange}/>
                <button onClick={() => handleDataClick()}>{buttonText}</button>
            </div>
        </div>

    );
}

