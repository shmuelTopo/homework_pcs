import { useState, useEffect} from "react";

const useFetch = (dataUrl) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(dataUrl);
  
    useEffect(() => {
        if(!url) {
            setLoading(false);
            setData(null);
            setError(null);
            return;
        };

        setLoading(true);
        const fetchData = async () => {
            try {
                const resp = await fetch(url);
                const data = await resp.json();
                
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
    
        fetchData();
    }, [url]);
  
    return { loading, data, error, setUrl };
};

export default useFetch;
