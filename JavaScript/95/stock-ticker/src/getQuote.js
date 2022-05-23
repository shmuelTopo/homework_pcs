// import apiKey from './api_key';
const apiKey = 'demo';

async function getQuoteBySymbol(symbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
        const data = await response.json();

        const resTicker = await fetch('./stock-tickers.json');
        const tickers = await resTicker.json();
        console.log(tickers);

        if(data.Note){
            throw new Error(data.Note);
        }

        const companiesDetail = JSON.parse(localStorage.getItem('companiesDetail')) || {};
        let companyData;
        let companyResponse;

        if(companiesDetail[symbol]){
            companyData = companiesDetail[symbol];
            console.log('found', symbol, companyData);
        } else {
            companyResponse = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apiKey}`);
            companyData = await companyResponse.json();
            if(companyData.Note){
                throw new Error(companyData.Note);
            }
            console.log('this is the company info I got from the server', companyData);
            companiesDetail[symbol] = companyData;
            localStorage.setItem('companiesDetail', JSON.stringify(companiesDetail));
        }
        console.log(companyData, data);
        return {
            symbol: data['Global Quote']['01. symbol'],
            price: data['Global Quote']['05. price'],
            change: data['Global Quote']['09. change'],
            companyName: companyData.Name,
            companyDescription: companyData.Description,
            isGaining: data['Global Quote']['09. change'] > 0
        };
    } catch(error) {
        throw new Error(error);
    }
    
}

export default getQuoteBySymbol;