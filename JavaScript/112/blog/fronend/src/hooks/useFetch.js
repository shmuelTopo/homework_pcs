import { useState, useEffect} from "react";

const useFetch = (dataUrl) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    if(loading || data || error) {
      return;
    }
    const fetchData = async () => {
      try {
        const resp = await fetch(dataUrl, {
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
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [data, dataUrl, error, loading]);

  return { loading, data, error };
};

export default useFetch;
