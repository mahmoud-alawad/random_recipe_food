
const cardsContainer = document.querySelector('.section-center');
const searchFoodInput = document.querySelector('#searchFoodInput');
const searchFoodSubmit = document.querySelector('#searchFoodSubmit');
const id = 'a3eb042c';
const API_KEY = `971b494bf790410ec1e9abae75b2799c`;
const id_Food = '8e59d3bc';
const API_KEY_FOOD = `f459e28ce2872bed0fbe6481a6df3665`;
cardsContainer.innerHTML = '';
let recipesContainer = [];


    
    searchFoodSubmit.addEventListener('click', ()=>{
        const filterArr = recipesContainer.q
        if (filterArr === null) {
            console.log('ok');
        }else{

            getMeals(filterArr);
        }
    })



async function getMeals(val) {
    const URI = `https://api.edamam.com/search?q=${val}&app_id=${id}&app_key=${API_KEY}`;
    const RANDOM_FOOD = `https://www.themealdb.com/api/json/v1/1/random.php`;
    const URI_FOOD = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=red%20apple&app_id=${id_Food}&app_key=${API_KEY_FOOD}`;

    try {
        const response = await fetch(RANDOM_FOOD);
        recipesContainer = await response.json();
        let meals = recipesContainer.meals[0];
        randomMeal(meals);
        console.log(meals);
        
	//fillCards(recipes)
    } catch (error) {
        console.log(error);
    }

}




function randomMeal(item) {
    const ingredientes = [];
    for (let i = 1; i < 20; i++) {

        if (item[`strIngredient${i}`]) {
            ingredientes.push(`${item[`strIngredient${i}`]}`);
            ingredientes.push(`${item[`strMeasure1${i}`]}`);
        }else{
            break;
        }
    }

    cardsContainer.innerHTML = `
    <article class="menu-item">
    <img src="${item.strMealThumb}" alt=".." class="recipeImg">
    <div class="item-info">
      <header>
        <h4>${item.strMeal} <span class="text-white">Category:  ${item.strCategory}</span> </h4>
        <h4 class="price">${item.strArea} </h4>
      </header>
      <p class="item-text">${item.strInstructions}</p>
      <div class="menu-ingredients">

      <i class='bx bx-caret-up close-ing'></i>
      <ul>
      ${ingredientes.map(ing=> `
      <li class="list-item-ing">${ing}</li>
      ` ).join('')}
      </ul>
      </div>
    </div>
  </article>
    `;

    const ulRecipe = cardsContainer.querySelector('.menu-ingredients');
    let listItemIngs = cardsContainer.querySelectorAll(['.list-item-ing']);
     let listArr = Array.from(listItemIngs);
    console.log(listArr);
    listArr.filter(listItem => listItem.textContent !== undefined)
    const closeIng = cardsContainer.querySelector('.close-ing').addEventListener('click', ()=>{
        ulRecipe.style.display = 'none';
    })
    const imageRecipe = cardsContainer.querySelector('.recipeImg').addEventListener('click', ()=>{
        ulRecipe.style.display = 'block';
    })
}

