const recipeCategoryName = ()=>{
    let recipeCategory = 'potato';
    let getRecipeCategory = () => {
        return recipeCategory;
    }
    let setRecipeCategory = (categoryName) => {
        recipeCategory = categoryName;
        loadRecipe();
    }

    return {
        getRecipeCategory: getRecipeCategory,
        setRecipeCategory: setRecipeCategory
    }
}

const recipeCategory = recipeCategoryName();

const loadRecipe = async ()=>{
    const itemName = recipeCategory.getRecipeCategory();
    const recipeListUrl = `json\\${itemName}.json`;

    try{
        const recipeListJson = await fetch(recipeListUrl);
        const recipeList = await recipeListJson.json();
        return showRecipe(recipeList.meals);
    }
    catch(error) {
        console.error(error);
    }
}

loadRecipe('Potato');

const showRecipe = (recipeList) => {
    const recipeListElement = document.getElementById('recipe-list');

    recipeListElement.innerHTML = '';

    recipeList.forEach(recipeItem => {
        const recipeCardElem = document.createElement('div');
        recipeCardElem.classList = 'card glass';

        recipeCardElem.innerHTML = `
            <div class="card h-80">
                <figure>
                  <img
                    class='bg-gray-100 min-w-36 min-h-36 m-6'
                    src="${recipeItem.strImageSource}"
                    alt="${recipeItem.strImageSource}" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title"
                  alt="${recipeItem.strMeal}"
                  >
                  ${recipeItem.strMeal.substr(0, 20)}${recipeItem.strMeal.length > 20 ? '...' : ''}
                  </h2>
                  <div>
                    <span class='p-2 bg-amber-100 text-xs rounded-lg'>${recipeItem.strCategory}</span>
                    <span class='p-2 bg-rose-100 text-xs rounded-lg'>${recipeItem.strArea}</span>
                  </div>
                  <div class="card-actions justify-end">
                    <i class="fa-brands fa-youtube color-red-600"></i>
                  </div>
                </div>
            </div>
        `;

        recipeListElement.appendChild(recipeCardElem);

    });
}