import { useParams } from 'react-router-dom';
import apiKey from '../api_key';
import { useState, useEffect, useMemo } from 'react';
// import temp_data from '../temporary_data.json';
import handleRecipe from '../handleRecipe.js'
import Recipe from '../Recipe.jsx';

export default function SearchResults() {
  
  const param = useParams();
  const [ data, setData ] = useState(null);
  const [ status, setStatus ] = useState('searching');
  const [ searchQuery ] = useState(param.search);
  const [ previousUrl, setPreviousUrl ] = useState(null);

  const searchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${param.search}&app_id=${apiKey.app_id}&app_key=${apiKey.app_key}`;

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchHistory = JSON.parse(localStorage.getItem('searchMemory')) || {};

  if(searchHistory[param.search] && status !== 'success'){
    //console.log(`Found ${param.search} in the history`);
    setData(searchHistory[param.search]);
    setStatus('success');
  }

  
  useEffect(() => {
    console.log('inside the use effect');

    if(previousUrl === searchUrl || status === 'success'){
      return;
    }


    console.log('searchResults');
    const fetchData = async () => {
      try {

          const r = await fetch(searchUrl);
          const d = await r.json();

          const theRecipes = handleRecipe(d)
          setData(theRecipes);

          console.log('memory before', searchHistory);

          searchHistory[param.search] = theRecipes;

          console.log('memory after', searchHistory);


          localStorage.setItem('searchMemory', JSON.stringify(searchHistory));

          setStatus('success');
          setPreviousUrl(searchUrl);
      } catch (error) {
          setStatus('error');
          console.error('the error is', error);
      }
    };
    fetchData();

  }, [data, param.search, previousUrl, searchHistory, searchQuery, searchUrl, status])

  useEffect(() => {
    setStatus('loading');
  }, [param.search])

  return (
    <div className='mt-16 rounded-lg p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4'>
      {status !== 'success' && <div>Searching for {param.search}...</div>}
      {status === 'success' && (
        <>
          {data.hits.map(result => {
            return <Recipe key={result.id} recipe={result} />
          })}
        </> 
        
      )}
    </div>
    
  )
}
