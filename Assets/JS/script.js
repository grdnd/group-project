const search = document.querySelector("#product");
const searchBtn = document.querySelector("#search");
const display = document.querySelector("#results")
const displayDrinkName = document.querySelector("#drinkName")
const displayDrinkPic = document.querySelector("#drinkPic")
const displayDrinkInstructions = document.querySelector("#instructions")
const displayDrinkIngregients = document.querySelector("#ingredients")

var cocktail = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var cocktailIngrediants = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

var cocktailValues = {
    drinkId: "",
    drinkName: "",
    drinkImage: "",
    drinkInstructions: ""
}

var ingrediantValues = []

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var drink = search.value
    getcocktailId(drink);
})

function getcocktailId(query) {
    fetch(`${cocktail}${query}`)
        .then(response => {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            cocktailValues.drinkId = data.drinks[0].idDrink;
            cocktailValues.drinkName = data.drinks[0].strDrink;
            cocktailValues.drinkImage = data.drinks[0].strDrinkThumb;
            getIngrediants(cocktailValues.drinkId)
        })
}

function getIngrediants(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            // for (let i = 1; i < data.drinks[0].strIngredient1.length; i++) {
            //     const element = data.drinks[0].strIngredient[i];
            //     console.log(element[i])

            // }
            cocktailValues.drinkInstructions = data.drinks[0].strInstructions
            displayResults();
        })
}

function displayResults() {
    displayDrinkName.textContent = cocktailValues.drinkName
    displayDrinkPic.src = cocktailValues.drinkImage
    displayDrinkInstructions.textContent = cocktailValues.drinkInstructions;
    // displayDrinkIngregients.textContent 
}