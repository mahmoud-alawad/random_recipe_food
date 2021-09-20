
const cardsContainer = document.querySelector('.section-center');
const searchFoodInput = document.querySelector('#searchFoodInput');
const searchFoodSubmit = document.querySelector('#searchFoodSubmit');
const id = 'a3eb042c';
const API_KEY = `971b494bf790410ec1e9abae75b2799c`;
const id_Food = '8e59d3bc';
const API_KEY_FOOD = `f459e28ce2872bed0fbe6481a6df3665`;
cardsContainer.innerHTML = '';
let recipesContainer = [];
let meals = [];
let name = '';



// myModal.addEventListener('shown.bs.modal', function () {
// })


async function getMeals() {
   // const URI = `https://api.edamam.com/search?q=${val}&app_id=${id}&app_key=${API_KEY}`;
    const RANDOM_FOOD = `https://www.themealdb.com/api/json/v1/1/random.php`;
    const URI_FOOD = `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=red%20apple&app_id=${id_Food}&app_key=${API_KEY_FOOD}`;

    try {
        const response = await fetch(RANDOM_FOOD);
        recipesContainer = await response.json();
        meals.push(recipesContainer.meals[0])
        console.log(recipesContainer);
        currentMealId = recipesContainer.meals[0].idMeal;
        console.log(currentMealId);
        localStorage.setItem('recipe', JSON.stringify(meals));
        randomMeal(meals)
    } catch (error) {
        console.log(error);
    }

}




function randomMeal(item) {
  let itemm = item[item.length - 1];
    const ingredientes = [];
    console.log(itemm);
    for (let i = 1; i < 20; i++) {

        if (itemm[`strIngredient${i}`]) {
            ingredientes.push(`${itemm[`strIngredient${i}`]}`);
            ingredientes.push(`${itemm[`strMeasure1${i}`]}`);
        }else{
            break;
        }

        if (ingredientes[i].value === '' && ingredientes[i] === 'undefined') {
           
            console.log('ok');
        }
    }
    const ingredientsTrimed = ingredientes.filter(ing => {
       
        return ing !== '' && ing !== 'undefined';
    })

            //ui staff 
    cardsContainer.innerHTML = `
    <article class="menu-item">
    <img src="${itemm.strMealThumb}" alt=".." class="recipeImg">
    <div class="item-info">
      <header>
        <h4 class='fw-bold shadow-sm  rounded'>${itemm.strMeal}</h4>
         <h3 class="">Category : <span class='text-danger badge bg-dark'> ${itemm.strCategory}</span></h3>
        <h4 class="price badge rounded-pill bg-success p-3 ">${itemm.strArea} </h4>
      </header>
      <p class="item-text">${itemm.strInstructions}</p>
      <div class='d-flex justify-content-between'>
      <button class='btn'>ingredients</button>
      <a class='btn' href=${itemm.strSource} target='_blank'>Meal Source</a>
      </div>
      <div class="menu-ingredients">

     
      <i class='bx bx-x close-ing'></i>
      <ul>
      ${ingredientsTrimed.map(ing=> `
      <li class="list-item-ing">${ing}</li>
      ` ).join('')}
      </ul>
</div>


      </div>
    </div>
</article>
    `;


    //images info 
    const ulRecipe = cardsContainer.querySelector('.menu-ingredients');
    let listItemIngs = cardsContainer.querySelectorAll(['.list-item-ing']);
    let listArr = Array.from(listItemIngs);
    listArr.filter(listItem => listItem.textContent !== undefined)
    const closeIng = cardsContainer.querySelector('.close-ing').addEventListener('click', ()=>{
        ulRecipe.classList.remove('active')
    })
     const ingredientsBtn = cardsContainer.querySelector('.btn').addEventListener('click', (e) => {
        console.log(e.target);
        ulRecipe.classList.add('active');
    })
}

        //button function
searchFoodSubmit.addEventListener('click', (e) => {
    getMeals()
})
    
    if (localStorage.getItem('recipe')) {
        const rec = JSON.parse(localStorage.getItem('recipe'));
        randomMeal(rec)
        }

