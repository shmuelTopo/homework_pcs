import { useParams } from 'react-router-dom'
import getQuoteBySymbol from './getQuote';
import { useState, useEffect } from 'react';

export default function StockDetails() {
    const params = useParams();
    const [quote, setQuote] = useState(null);

    useEffect(() => {
      (async function() {
            try {
                const theQuote = await getQuoteBySymbol(params.ticker);
                setQuote(theQuote);
            } catch(error) {
                console.log(error)
            }
            
        })();
    }, [params.ticker])
    
    

    return (
        <>
            {quote && (
                <div className='stock-details'>
                    <h2>{quote.symbol} - {quote.companyName}</h2>
                    <p>{quote.companyDescription}</p>
                    <h3 style={{color: quote.isGaining ? 'green': 'red'}}>
                        Price: {quote.price}{quote.isGaining ? '↑' : '↓' }
                    </h3>
                </div>
            )}
        </>  
    )
}
