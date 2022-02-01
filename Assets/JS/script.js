const search = document.querySelector("#product");
const searchBtn = document.querySelector("#search");
const display = document.querySelector("#results")
const displayDrinkName = document.querySelector("#drinkName")
const displayDrinkPic = document.querySelector("#drinkPic")
const displayDrinkInstructions = document.querySelector("#instructions")
const displayDrinkIngregient1 = document.querySelector("#ingredient1")
const displayDrinkIngregient2 = document.querySelector("#ingredient2")
const displayDrinkIngregient3 = document.querySelector("#ingredient3")
const displayDrinkIngregient4 = document.querySelector("#ingredient4")
const displayDrinkIngregient5 = document.querySelector("#ingredient5")
const displayDrinkIngregient6 = document.querySelector("#ingredient6")
const displayDrinkIngregient7 = document.querySelector("#ingredient7")
const displayDrinkIngregient8 = document.querySelector("#ingredient8")
const displayDrinkIngregient9 = document.querySelector("#ingredient9")
const displayDrinkIngregient10 = document.querySelector("#ingredient10")
const displayDrinkIngregient11 = document.querySelector("#ingredient11")
const displayDrinkIngregient12 = document.querySelector("#ingredient12")
const displayDrinkIngregient13 = document.querySelector("#ingredient13")
const displayDrinkIngregient14 = document.querySelector("#ingredient14")
const displayDrinkIngregient15 = document.querySelector("#ingredient15")

const ingredientsArray = []

var cocktail = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var cocktailIngrediants = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

var cocktailValues = {
    drinkId: "",
    drinkName: "",
    drinkImage: "",
    drinkInstructions: "",
    drinkIngredient1: "",
    drinkIngredient2: "",
    drinkIngredient3: "",
    drinkIngredient4: "",
    drinkIngredient5: "",
    drinkIngredient6: "",
    drinkIngredient7: "",
    drinkIngredient8: "",
    drinkIngredient9: "",
    drinkIngredient10: "",
    drinkIngredient11: "",
    drinkIngredient12: "",
    drinkIngredient13: "",
    drinkIngredient14: "",
    drinkIngredient15: "",
    drinkMeasure1: "",
    drinkMeasure2: "",
    drinkMeasure3: "",
    drinkMeasure4: "",
    drinkMeasure5: "",
    drinkMeasure6: "",
    drinkMeasure7: "",
    drinkMeasure8: "",
    drinkMeasure9: "",
    drinkMeasure10: "",
    drinkMeasure11: "",
    drinkMeasure12: "",
    drinkMeasure13: "",
    drinkMeasure14: "",
    drinkMeasure15: ""
}

var ingrediantValues = []

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    displayDrinkName.innerHTML = ""
    displayDrinkPic.innerHTML = ""
    displayDrinkInstructions.innerHTML = ""
    var drink = search.value
    getcocktailId(drink);
})

function getcocktailId(query) {
    fetch(`${cocktail}${query}`)
        .then(response => {
            let data = response.json();
            console.log(data)
            return data;
        })
        .then(function(data) {
            console.log(data);
            if (data.drinks !== null) {
                cocktailValues.drinkId = data.drinks[0].idDrink;
                cocktailValues.drinkName = data.drinks[0].strDrink;
                cocktailValues.drinkImage = data.drinks[0].strDrinkThumb;
                getIngrediants(cocktailValues.drinkId)
            } else {
                displayDrinkName.innerHTML = "No drinks found. Please try a different ingredient"
                displayDrinkPic.src = "https://cdn.dribbble.com/users/1012566/screenshots/4187820/media/3cb974c28eb00627cc0671685c79ffd9.jpg";
            }
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
            cocktailValues.drinkInstructions = data.drinks[0].strInstructions;
            cocktailValues.drinkIngredient1 = data.drinks[0].strIngredient1;
            cocktailValues.drinkIngredient2 = data.drinks[0].strIngredient2;
            cocktailValues.drinkIngredient3 = data.drinks[0].strIngredient3;
            cocktailValues.drinkIngredient4 = data.drinks[0].strIngredient4;
            cocktailValues.drinkIngredient5 = data.drinks[0].strIngredient5;
            cocktailValues.drinkIngredient6 = data.drinks[0].strIngredient6;
            cocktailValues.drinkIngredient7 = data.drinks[0].strIngredient7;
            cocktailValues.drinkIngredient8 = data.drinks[0].strIngredient8;
            cocktailValues.drinkIngredient9 = data.drinks[0].strIngredient9;
            cocktailValues.drinkIngredient10 = data.drinks[0].strIngredient10;
            cocktailValues.drinkIngredient11 = data.drinks[0].strIngredient11;
            cocktailValues.drinkIngredient12 = data.drinks[0].strIngredient12;
            cocktailValues.drinkIngredient13 = data.drinks[0].strIngredient13;
            cocktailValues.drinkIngredient14 = data.drinks[0].strIngredient14;
            cocktailValues.drinkIngredient15 = data.drinks[0].strIngredient15;
            cocktailValues.drinkMeasure1 = data.drinks[0].strMeasure1;
            cocktailValues.drinkMeasure2 = data.drinks[0].strMeasure2;
            cocktailValues.drinkMeasure3 = data.drinks[0].strMeasure3;
            cocktailValues.drinkMeasure4 = data.drinks[0].strMeasure4;
            cocktailValues.drinkMeasure5 = data.drinks[0].strMeasure5;
            cocktailValues.drinkMeasure6 = data.drinks[0].strMeasure6;
            cocktailValues.drinkMeasure7 = data.drinks[0].strMeasure7;
            cocktailValues.drinkMeasure8 = data.drinks[0].strMeasure8;
            cocktailValues.drinkMeasure9 = data.drinks[0].strMeasure9;
            cocktailValues.drinkMeasure10 = data.drinks[0].strMeasure10;
            cocktailValues.drinkMeasure11 = data.drinks[0].strMeasure11;
            cocktailValues.drinkMeasure12 = data.drinks[0].strMeasure12;
            cocktailValues.drinkMeasure13 = data.drinks[0].strMeasure13;
            cocktailValues.drinkMeasure14 = data.drinks[0].strMeasure14;
            cocktailValues.drinkMeasure15 = data.drinks[0].strMeasure15;

            displayResults();
        })
}

function displayResults() {
    displayDrinkName.textContent = cocktailValues.drinkName
    displayDrinkPic.src = cocktailValues.drinkImage
    displayDrinkInstructions.textContent = cocktailValues.drinkInstructions;


    // var myobj = document.getElementById("demo");
    // myobj.remove();
}