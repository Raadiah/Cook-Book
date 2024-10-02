const POTATO_MENU = 'potato';
const SOUP_MENU = 'soup';
const BEEF_MENU = 'beef';
const CHICKEN_MENU = 'chicken';

const recipeCategoryName = ()=>{
    let recipeCategory = POTATO_MENU;
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

const recipeCategory = recipeCategoryName();
recipeCategory.setRecipeCategory(POTATO_MENU);

const showRecipe = (recipeList) => {
    const recipeListElement = document.getElementById('recipe-list');

    recipeListElement.innerHTML = '';

    recipeList.forEach(recipeItem => {
        const recipeCardElem = document.createElement('div');
        recipeCardElem.classList = 'card glass';

        recipeCardElem.innerHTML = `
            <div class="card h-80">
                <figure class='w-full h-1/2'>
                  <img
                    class='bg-gray-100 w-full min-h-36 m-6'
                    src="${recipeItem.strMealThumb}"
                    alt="${recipeItem.strMealThumb}" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title"
                  alt="${recipeItem.strMeal}"
                  >
                  ${recipeItem.strMeal.substr(0, 16)}${recipeItem.strMeal.length > 16 ? '...' : ''}
                  </h2>
                  <div>
                    <span class='p-2 bg-amber-100 text-xs rounded-lg'>${recipeItem.strCategory}</span>
                    <span class='p-2 bg-rose-100 text-xs rounded-lg'>${recipeItem.strArea}</span>
                  </div>
                  <div class="card-actions justify-end">
                    <a href=${recipeItem.strYoutube} target='_blank'><i class="fa-brands fa-youtube text-3xl text-red-600 hover:text-red-800"></i></a>
                  </div>
                </div>
            </div>
        `;

        recipeListElement.appendChild(recipeCardElem);

    });
}