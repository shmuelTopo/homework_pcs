import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import apiKey from '../api_key';

export default function RecipeDetails(state, props, props2) {
    const location = useLocation();
    const param = useParams();
    const [ recipe, setRecipe ] = useState(location.state);
    const [ status, setStatus ] = useState('loading');

    if(recipe && status !== 'success'){
        setStatus('success');
    }

    useEffect(() => {
        if(status === 'success'){
            return;
        }
        if(!recipe) {
            const fetchData = async () => {
                try {
                    const url = `https://api.edamam.com/api/recipes/v2/${param.recipeId}?type=public&app_id=${apiKey.app_id}&app_key=${apiKey.app_key}`;
                    const r = await fetch(url);
                    const d = await r.json();
                    setRecipe(d.recipe);
                    setStatus('success');
                } catch (error) {
                    setStatus('error');
                    console.error('the error is', error);
                }
              };
              fetchData();
        }
    } ,[param.recipeId, recipe, status])

  return (
      <>
        {status === 'success' && (
            <div className='mt-16 p-4 flex flex-col w-full'>
                <div className='flex flex-row text-center w-full border bg-gray-500/5 rounded-lg'>
                    <img className="rounded-t-lg link" alt="recipe" src={recipe.image} />
                    <div className='w-full flex flex-col justify-center'>
                        <h5 className='text-3xl font-bold'>{recipe.label}</h5>
                        <a target="_blank" rel="noreferrer" className='btn btn-link' href={recipe.sourceUrl}>For full recipe click here</a>
                    </div>
                </div>
                <div className='grid grid-cols-2 p-4'>
                    <div className='flex flex-col gap-4 text-md'>
                        <h5 className='bold text-xl'>Ingredients</h5>
                        <hr />
                        <div className='px-4 flex flex-col gap-5'>
                            {recipe.ingredientsText.map((ing, index) => {
                                return <p key={ing}>{ing}</p>
                            })}
                        </div>
                        
                    </div>
                    <div>
                        <p>Nutrition</p>
                    </div>
                    
                </div>
                
            </div>
        )}
    </>
  )
}
