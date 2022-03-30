import React from 'react'
import { Link } from 'react-router-dom';

export default function Recipe({recipe}) {
  
  // return (
  //   <div>
  //       <h5 className='text-lg font-bold'>{recipe.label}</h5>
        
  //       {recipe.ingredientsText.map((ing, index) => {
  //           return <p>{ing}</p>
  //       })}
  //       <Link className='btn btn-small' to={`/recipe/${recipe.id}`} state={recipe}>Open Recipe</Link>

        
  //   </div>
  // )
  console.log(recipe);

  return (
    <Link to={`/recipe/${recipe.id}`} state={recipe}>
    <div className="flex h-full rounded-lg bg-gray-500/30 hover:bg-gray-500/40 flex-col">
      <img className="rounded-t-lg" alt="recipe" src={recipe.image} />

      <div className="h-full p-2 flex flex-col justify-between">
        <p className="text-md font-bold">{recipe.label}</p>
        <div className="">
          <hr />
          <div className=" my-1 gap-1 flex flex-row justify-center font-extralight text-xs">
            <p className="text-success">{Math.round(recipe.calories)}</p>
            <p className=""> CALORIES</p>
            <div className="border-l-[1px] mx-1" />
            <p className="text-success">{recipe.ingredients.length}</p>
            <p className="font-thin">INGREDIENTS</p>
          </div>
          
          <hr />
          <p className="text-sm">{recipe.source}</p>
        </div>
        
      </div>
    </div>
    </Link>
  )
}
