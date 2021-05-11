"use strict";

var cardsContainer = document.querySelector('.section-center');
var searchFoodInput = document.querySelector('#searchFoodInput');
var searchFoodSubmit = document.querySelector('#searchFoodSubmit');
var id = 'a3eb042c';
var API_KEY = "971b494bf790410ec1e9abae75b2799c";
var id_Food = '8e59d3bc';
var API_KEY_FOOD = "f459e28ce2872bed0fbe6481a6df3665";
cardsContainer.innerHTML = '';
var recipesContainer = [];
searchFoodSubmit.addEventListener('click', function () {
  var filterArr = recipesContainer.q;

  if (filterArr === null) {
    console.log('ok');
  } else {
    getMeals(filterArr);
  }
});

function getMeals(val) {
  var URI, RANDOM_FOOD, URI_FOOD, response, meals;
  return regeneratorRuntime.async(function getMeals$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          URI = "https://api.edamam.com/search?q=".concat(val, "&app_id=").concat(id, "&app_key=").concat(API_KEY);
          RANDOM_FOOD = "https://www.themealdb.com/api/json/v1/1/random.php";
          URI_FOOD = "https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=red%20apple&app_id=".concat(id_Food, "&app_key=").concat(API_KEY_FOOD);
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(RANDOM_FOOD));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          recipesContainer = _context.sent;
          meals = recipesContainer.meals[0];
          randomMeal(meals);
          console.log(meals); //fillCards(recipes)

          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](3);
          console.log(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 15]]);
}

function randomMeal(item) {
  var ingredientes = [];

  for (var i = 1; i < 20; i++) {
    if (item["strIngredient".concat(i)]) {
      ingredientes.push("".concat(item["strIngredient".concat(i)]));
      ingredientes.push("".concat(item["strMeasure1".concat(i)]));
    } else {
      break;
    }
  }

  cardsContainer.innerHTML = "\n    <article class=\"menu-item\">\n    <img src=\"".concat(item.strMealThumb, "\" alt=\"..\" class=\"recipeImg\">\n    <div class=\"item-info\">\n      <header>\n        <h4>").concat(item.strMeal, " <span class=\"text-white\">Category:  ").concat(item.strCategory, "</span> </h4>\n        <h4 class=\"price\">").concat(item.strArea, " </h4>\n      </header>\n      <p class=\"item-text\">").concat(item.strInstructions, "</p>\n      <div class=\"menu-ingredients\">\n\n      <i class='bx bx-caret-up close-ing'></i>\n      <ul>\n      ").concat(ingredientes.map(function (ing) {
    return "\n      <li class=\"list-item-ing\">".concat(ing, "</li>\n      ");
  }).join(''), "\n      </ul>\n      </div>\n    </div>\n  </article>\n    ");
  var ulRecipe = cardsContainer.querySelector('.menu-ingredients');
  var listItemIngs = cardsContainer.querySelectorAll(['.list-item-ing']);
  var listArr = Array.from(listItemIngs);
  console.log(listArr);
  listArr.filter(function (listItem) {
    return listItem.textContent !== undefined;
  });
  var closeIng = cardsContainer.querySelector('.close-ing').addEventListener('click', function () {
    ulRecipe.style.display = 'none';
  });
  var imageRecipe = cardsContainer.querySelector('.recipeImg').addEventListener('click', function () {
    ulRecipe.style.display = 'block';
  });
}