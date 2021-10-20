(function() {
    'use strict';

    async function fetchRecipes(){
        try {
            const r = await fetch('db-recipes.json');
            if (!r.ok) {
              throw new Error(`${r.status} ${r.statusText}`);
            }
            const recipes = await r.json();
            console.log('coca',filterRecipes('coca', recipes));
            //dispalyRecipe(recipes, 'id32');

            $('#search').change(() => {
                const foundRecipe = getRecipeyBySearch($('#search').val(), recipes);
                dispalyRecipe(foundRecipe[0]);
            });
        } catch(err) {
            console.error(err, true);
        }
    }

    function filterRecipes(searchKeyword, recipesObject){
        const searchResults = [];
        Object.keys(recipesObject).forEach((id)=> {
            if(recipesObject[id].name.toLowerCase().includes(searchKeyword.toLowerCase())){
                searchResults.push(recipesObject[id]);
            }   
        });
        console.log('hi', searchResults);

        return searchResults;
    }

    function getRecipeyBySearch(search, recipes){
        const found = filterRecipes(search, recipes);
        return found;
    }

    function dispalyRecipe(recipe){
        $('#recipeContainer').show();
        console.log("jjj", recipe);
        $('#name').text(recipe.name);
        $('#source').text(recipe.source);
        if(recipe.cooktime){
            $('#cookTime').text(`${recipe.cooktime / 60}m`);
        }
        if(recipe.preptime){
            $('#prepTime').text(`${recipe.preptime / 60}m`);
        }
        $('#servings').text(recipe.servings);
        let ingredientsElem = $('<ul></ul>');
        recipe.ingredients.forEach((i) =>  {
            if(!i.includes('<hr>')){
                ingredientsElem.append(`<li>${i}</li>`);
            }
        });
        //console.log(ingredientsElem);
        //console.log(recipe.ingredients);

        $('#ingredients').html(ingredientsElem);

        $('#instructions').text(recipe.instructions);
    }

    

    fetchRecipes();

})();