import { useState } from 'react'
import { Link } from 'react-router-dom';
import tempImg from './temp_image.png';

export default function RecipeBox({recipe}) {

  const [ imgLoaded, setImageLoaded ] = useState(false);



  return (
    <Link to={`/recipe/${recipe.id}`} state={recipe}>
      <div className='rounded-lg hover:scale-105 h-full text-center bg-gray-500/20 hover:bg-gray-500/30 flex flex-col gap-2'>
        <div className='-z-1 overflow-hidden rounded-t-lg  w-full'>
          <img className='-z-1 scale-125' alt='food' src={imgLoaded !== 'j' ? recipe.image : tempImg}
            onLoad={() => setImageLoaded(true)} />
        </div>
        <p className="text-sm font-bold">{recipe.title}</p>
        <div className='flex flex-col gap-1 mb-2'>
          <hr />
          <div className="my-1 gap-1 flex flex-row justify-center font-extralight text-xs">
            <p className="font-bold italic">{Math.round(recipe.calories)}</p>
            <p> CALORIES</p>
            <div className="hr border-l-[1px] mx-1" />
            <p className="font-bold italic">{recipe.numOfIngredients}</p>
            <p>INGREDIENTS</p>
          </div>

          <hr />
          <p className="text-sm">{recipe.sourceName}</p>
        </div>

      </div>
    </Link>
  )
}




  /*return (
    <Link to={`/recipe/${recipe.id}`} state={recipe}>
      <div className="flex h-full rounded-lg bg-gray-500/30 hover:bg-gray-500/40 flex-col">
          <div className='overflow-hidden h-88 rounded-t-lg'>
            <img className="scale-125" alt="recipe"
              src={imgLoaded ? recipe.image : tempImg}
              onLoad={() => setImageLoaded(true)} />
        </div>
        

        <div className="h-full p-2 flex flex-col justify-between">
          <p className="text-md font-bold">{recipe.label}</p>
          <div>
            <hr />
            <div className=" my-1 gap-1 flex flex-row justify-center font-extralight text-xs">
              <p className="font-bold italic">{Math.round(recipe.calories)}</p>
              <p> CALORIES</p>
              <div className="border-l-[1px] mx-1" />
              <p className="font-bold italic">{recipe.ingredients.length}</p>
              <p>INGREDIENTS</p>
            </div>
            
            <hr />
            <p className="text-sm">{recipe.source}</p>
          </div>
          
        </div>
      </div>
    </Link>
  )
}*/
