import { useState, useEffect} from "react";

const useFetch = (dataUrl) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(dataUrl);
  const [refresh, setRefresh] = useState(true);
  
  useEffect(() => {
    console.log('inside fetch');
    if(loading || error || !url || !refresh) {
      return;
    }
    setLoading(true);
    
    const fetchData = async () => {
      try {
        const resp = await fetch(url, {
          method: "GET",
          credentials: "include",
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        const data = await resp.json();
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      } finally {
        setRefresh(false);
      }
    };
  
    fetchData();
  }, [ url, refresh ]);

  return { loading, data, setUrl, setRefresh, error };
};

export default useFetch;
