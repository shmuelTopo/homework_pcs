import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import apiKey from '../api_key';
import tempImg from '../temp_image.png';
import { filterRecipe } from '../handleRecipe';
import clock from '../icons/clock.svg';
import meal from '../icons/meal.svg';

export default function RecipeDetails() {
    const param = useParams();
    const [ recipe, setRecipe ] = useState(null);
    const [ status, setStatus ] = useState('loading');
    const [ imgLoaded, setImgLoaded ] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const recipeHistory = JSON.parse(localStorage.getItem('recipeHistory')) || {};
    console.log('the status is ', status);
    if (recipeHistory[param.recipeId] && status !== 'success') {
        console.log(`Found ${param.recipeId} in the history ${recipeHistory[param.recipeId]}`);


        setStatus('success');
        setRecipe(filterRecipe(recipeHistory[param.recipeId]));
    }

    useEffect(() => {
        if(status === 'success' || status === 'error'){
            return;
        }
        if(!recipe) {
            const fetchData = async () => {
                try {
                    const url = `https://api.spoonacular.com/recipes/${param.recipeId}/information?includeNutrition=true&apiKey=cf5643971ef94c78a0a26f30e7f9cb6c`
                    const r = await fetch(url);
                    console.log('r', r);
                    const d = await r.json();
                    console.log('d', d);

                    if(!r.ok){
                        setStatus('error');
                        throw new Error(r.status, r.text);
                    }
                    recipeHistory[param.recipeId] = d;
                    localStorage.setItem('recipeHistory', JSON.stringify(recipeHistory));

                    setRecipe(filterRecipe(d.recipe));
                    setStatus('success');
                } catch (error) {
                    setStatus('error');
                    setTimeout(() => {
                        setStatus('loading');
                    }, 10000);

                    console.error('the error is', error);
                }
              };
              fetchData();
        }
    } ,[param.recipeId, recipe, recipeHistory, status])


    return (
        <>
            {(status === 'success' && recipe) && (
                <div className='mt-16 p-4 flex flex-col w-full lg:w-3/4 xl:w-2/3 m-auto'>
                    <h2 className='font-bold text-4xl my-4'>{recipe.title}</h2>
                    <div className="italic text-justify xl:text-lg" dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
                    <div className='flex flex-col my-4 sm:flex-row gap-2 rounded-lg'>
                        <div className='overflow-hidden rounded-sm w-full sm:w-3/4'>
                            <img className='w-full scale-125' src={recipe.image} alt="food" />
                        </div>
                        <div className='text-gray-900 flex bg-white/50 rounded-lg flex-row sm:flex-col gap-3 p-3 sm:w-1/4'>
                            <div className='flex items-center gap-2'><img className='h-5' src={clock} alt="clock inline" /> <p>{recipe.readyInMinutes} minutes</p></div>
                            <div className='flex items-center gap-2'><img className='h-5' src={meal} alt="clock inline" /> <p>{recipe.servings} servings</p></div>
                            
                            <p className='font-bold hidden sm:inline underline'>Per Serving</p>
                            <p className='hidden sm:inline'>Weight {recipe.weightPerServing}</p>
                            <p className='hidden sm:inline'>{recipe.calories} calories</p>
                        </div>
                    </div>
                    
                </div>
            )}
        </>
    )
}

















  /*return (
      <>
        {(status === 'success' && recipe) && (
            <div className='mt-16 p-4 flex flex-col w-full'>
                <div className='flex flex-row text-center w-full border bg-gray-500/5 rounded-lg'>
                    <div className='rounded-l-lg'>
                          <img className="rounded-l-lg link" alt="recipe"
                              src={imgLoaded ? recipe.image : tempImg}
                              onLoad={() => setImgLoaded(true)} />
                    </div>
                    <div className='w-full flex flex-col justify-center'>
                        <h5 className='text-3xl font-bold'>{recipe.title}</h5>
                        <a target="_blank" rel="noreferrer" className='btn btn-link' href={recipe.sourceUrl}>For full recipe click here</a>
                    </div>
                </div>
                <div className='grid grid-cols-2 p-4'>
                    <div className='flex flex-col gap-4 text-md'>
                        <h5 className='bold text-xl'>Ingredients</h5>
                        <hr />
                        <div className='px-4 flex flex-col gap-5'>
                            {recipe.ingredients.map((ing, index) => {
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
}*/
