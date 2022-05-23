export default function getFilteredRecipes(recipes){
    const newList = {...recipes, results: recipes.results.map(hit => getFilteredRecipe(hit))};
    return newList;
}

export function getFilteredRecipe(recipe){
    return {
        id: recipe.id,
        title: recipe.title,
        // ingredients: recipe.nutrition.ingredients.map(ing => {
        //     return getIngredient(ing.amount, ing.unit, ing.name, recipe.servings);
        // }),
        numOfIngredients: recipe.nutrition.ingredients.length,
        // instructions: recipe.analyzedInstructions[0].steps,
        servings: recipe.servings,
        calories: Math.round(recipe.nutrition.nutrients[0].amount),
        readyInMinutes: recipe.readyInMinutes,
        sourceName: recipe.sourceName,
        sourceUrl: recipe.sourceUrl,
        summary: recipe.summary,
        weightPerServing: recipe.nutrition.weightPerServing,
        healthLabels: recipe.healthLabels,
        image: recipe.image,
    };
}

export function filterRecipe(recipe){
    console.log('filtering', recipe);

    const toReturn =  {
        id: recipe.id,
        title: recipe.title,
        ingredients: recipe.extendedIngredients.map(ing => {
            return getIngredient(ing.amount, ing.unit, ing.name);
        }),
        numOfIngredients: recipe.extendedIngredients.length,
        instructions: recipe.analyzedInstructions[0].steps,
        servings: recipe.servings,
        calories: Math.round(recipe.nutrition.nutrients[0].amount),
        readyInMinutes: recipe.readyInMinutes,
        sourceName: recipe.sourceName,
        sourceUrl: recipe.sourceUrl,
        summary: recipe.summary,
        weightPerServing: `${recipe.nutrition.weightPerServing.amount}${recipe.nutrition.weightPerServing.unit}`,
        healthLabels: recipe.healthLabels,
        image: recipe.image,
    };
    console.log('toReturn', toReturn);
    return toReturn;

}

function getIngredient(amount, unit, name){
    return `${amount} ${unit} ${name}`
}









// export default function getFilteredRecipes(recipes){
//     console.log('original search', recipes);
//     const newList = {...recipes, hits: recipes.hits.map(hit => getFilteredRecipe(hit))};
//     console.log(newList);
//     return newList;
// }

// export function getFilteredRecipe(recipe){
//     const theRecipe = recipe.recipe;
//     return {
//         id: theRecipe.uri.match(/[^_]*$/)[0],
//         label: theRecipe.label,
//         ingredients: theRecipe.ingredients,
//         ingredientsText: theRecipe.ingredientLines,
//         calories: theRecipe.calories,
//         digest: theRecipe.digest,
//         source: theRecipe.source,
//         sourceUrl: theRecipe.url,
//         totalTime: theRecipe.totalTime,
//         totalWeight: theRecipe.totalWeight,
//         healthLabels: theRecipe.healthLabels,
//         image: theRecipe.image,
//         images: theRecipe.images
//     };
// }

