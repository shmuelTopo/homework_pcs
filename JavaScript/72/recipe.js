(async function() {
    'use strict';

    //Gat hold of the dom elements
    const input = $('#searchInput');
    const dropdownContent = $('#dropdownContent');
    const searchBar = $('#searchBar');

    //Get Recipes from the json file
    const recipes = await getRecipes();


    input.on('input' ,() => getSearchAndUpdateDropdown());

    input.focus(() => {
        getSearchAndUpdateDropdown();
        dropdownContent.show();
        searchBar.addClass('focusBorder');
    });

    input.focusout(() => {
        setTimeout(() => dropdownContent.hide(), 100);
        
        searchBar.removeClass('focusBorder');
    });

    function getSearchAndUpdateDropdown(){
        const foundRecipes = getRecipeBySearch(input.val(), recipes);
        displaySearchContent(foundRecipes);
    }

    async function getRecipes(){
        try {
            const r = await fetch('db-recipes.json');
            if (!r.ok) {
              throw new Error(`${r.status} ${r.statusText}`);
            }
            const recipes = await r.json();
            return recipes;
        } catch(err) {
            console.error(err, true);
        }
    }

    function getRecipeBySearch(searchKeyword, recipesObject, numOfResults=5){
        if(!searchKeyword || searchKeyword.length < 1){
            return [];
        }
        const searchResults = [];
        Object.keys(recipesObject).forEach((id)=> {
            if(recipesObject[id].name.toLowerCase().includes(searchKeyword.toLowerCase())){
                searchResults.push(recipesObject[id]);
            }   
        });

        return searchResults.slice(0, numOfResults);
    }

    function displaySearchContent(recipesToDisplay){
        dropdownContent.empty();
        recipesToDisplay.forEach((recipe) => {
            
            $(`<a id=${recipe.id}>${recipe.name}</a>`).appendTo(dropdownContent).click(() => {
                displayRecipe(recipe);
            });

            
        });
    }

    function updateRecipeElem(recipe, elemId, updateTo){
        const elem = $(`#${elemId}`);
        const value = recipe[elemId];

        if(value){
            elem.parent().show();
            elem.html(updateTo || value);
        } else {
            elem.parent().hide();
        }
    }

    function displayRecipe(recipe){
        $('#recipeContainer').show();
    
        updateRecipeElem(recipe, 'name');
        updateRecipeElem(recipe, 'cooktime', `${recipe.cooktime / 60}m`);
        updateRecipeElem(recipe, 'preptime', `${recipe.preptime / 60}m`);
        updateRecipeElem(recipe, 'servings');
        
        let ingredientsElem = $('<ul></ul>');
        recipe.ingredients.forEach((i) =>  {
            if(!i.includes('<hr>')){
                ingredientsElem.append(`<li><img src="check.png"><span>${i}</span></li><br>`);
            }
        });

        updateRecipeElem(recipe, 'ingredients', ingredientsElem);
        updateRecipeElem(recipe, 'instructions');
    }

})();