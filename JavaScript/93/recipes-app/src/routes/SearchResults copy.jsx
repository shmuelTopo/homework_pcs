import { useParams } from 'react-router-dom';
import apiKey from '../api_key';
import { useState, useEffect } from 'react';
//import temp_data from '../temporary_data.json';
import Recipe from '../Recipe.jsx';

//import useSearchRecipes from '../useSearchRecipes';


export default function SearchResults() {
  
  //console.log(temp_data);
  const param = useParams();
  const [ data, setData ] = useState(null);
  const [ status, setStatus ] = useState('searching');
  const [ searchQuery, setSearchQuery ] = useState(param.search);
  const [ previousUrl , setPreviousUrl] = useState(null);
  

  const searchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${param.search}&app_id=${apiKey.app_id}&app_key=${apiKey.app_key}`;
  setPreviousUrl(searchUrl);

  if( searchQuery !== param.search){
    alert('are you sure?');
    setSearchQuery(param.search);
  }
  
  useEffect(() => {
    alert('use effect');

    console.log('hi there');
    console.log('same ?', previousUrl === searchUrl)
    if(previousUrl === searchUrl) {
      return;
    } 

    console.log('searchResults');
    const fetchData = async () => {
      try {
          console.log('searchUrl', searchUrl);
          const r = await fetch(searchUrl);
          const d = await r.json();
          setData(d);
          setStatus('success');
          alert('success');
      } catch (error) {
          setStatus('error');
          console.error('the error is', error);
      }
    };
    fetchData();


    /// for testing ///
    // setStatus('success');
    // setData(temp_data);
    /// end testing ///

    console.log('status', status, 'data', data);

  }, [searchQuery])

  console.log('hits', data.hits);

  return (
    <div className='p-4 bg-base'>
      {status !== 'success' && <div>Searching for {param.search}...</div>}
      {status === 'success' && (
        <>
          <div>Found {param.search}</div>
          {data.hits.map(result => {
            return <Recipe recipe={result.recipe} />
          })}
        </>
        
        
        
        
      )}
    </div>
    
  )
}
