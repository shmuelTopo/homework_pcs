import apiKey from "./api_key";

export default function getFilteredRecipes(recipes){
    console.log('old recipes', recipes);
    const newList = {...recipes, hits: recipes.hits.map(hit => getFilteredRecipe(hit))};
    console.log(newList);
    //Change this for active filtering
    return newList;
}

export function getFilteredRecipe(recipe){
    const theRecipe = recipe.recipe;
    return {
        id: theRecipe.uri.match(/[^_]*$/)[0],
        label: theRecipe.label,
        ingredients: theRecipe.ingredients,
        ingredientsText: theRecipe.ingredientLines,
        calories: theRecipe.calories,
        digest: theRecipe.digest,
        source: theRecipe.source,
        sourceUrl: theRecipe.url,
        totalTime: theRecipe.totalTime,
        totalWeight: theRecipe.totalWeight,
        healthLabels: theRecipe.healthLabels,
        image: theRecipe.image
    };
}

// export async function getRecipeById(id){
//     const url = `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${apiKey.app_id}&app_key=${apiKey.app_key}`;
//     const response = await fetch(url);
//     const recipe = await response.json();
//     console.log('the recipe is', recipe);
//     return recipe;
// }