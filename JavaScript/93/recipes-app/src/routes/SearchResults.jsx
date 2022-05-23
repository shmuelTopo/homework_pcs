import { useParams } from 'react-router-dom';
import apiKey from '../api_key';
import { useState, useEffect } from 'react';
// import temp_data from '../temporary_data.json';
import handleRecipe from '../handleRecipe.js'
import Recipe from '../RecipeBox.jsx';
import pasta from '../pasta.json';

export default function SearchResults() {
  
  const param = useParams();
  const [ data, setData ] = useState(null);
  const [ status, setStatus ] = useState('searching');
  const [ searchQuery ] = useState(param.search);
  const [ previousUrl, setPreviousUrl ] = useState(null);

  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${param.search}&number=100&addRecipeInformation=true&addRecipeNutrition=true&apiKey=cf5643971ef94c78a0a26f30e7f9cb6c`;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchHistory = JSON.parse(localStorage.getItem('searchMemory')) || {};

  if(searchHistory[param.search] && status !== 'success'){
    //console.log(`Found ${param.search} in the history`);
    //In future when app is complete and the desire filtering will be completed
    //We will not need to filter the search results since it will be stored filtered
    const searchData = handleRecipe(searchHistory[param.search]);
    setData(searchData);
    setStatus('success');
  }

  
  useEffect(() => {

    if(previousUrl === searchUrl || status === 'success'){
      return;
    }

    console.log('searchResults');
    const fetchData = async () => {
      try {
          const r = await fetch(searchUrl);
          const d = await r.json();
          //const d = pasta;
          
          const theRecipes = handleRecipe(d)
          setData(theRecipes);
          searchHistory[param.search] = d;

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
          {data.results.map(result => {
            return <Recipe key={result.id} recipe={result} />
          })}
        </> 
        
      )}
    </div>
    
  )
}
