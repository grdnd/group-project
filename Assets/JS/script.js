// global variables
const search = document.querySelector("#product");
const searchBtn = document.querySelector("#search");
const display = document.querySelector("#results")
const displayDrinkName = document.querySelector("#drinkName")
const displayDrinkPic = document.querySelector("#drinkPic")
const displayDrinkInstructions = document.querySelector("#instructions")
const displayDrinkIngregients = document.querySelector("#ingredients")
const displayDrinkNullIngregients = document.querySelectorAll("div")

const ingredientsArray = []

var cocktail = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="
var cocktailIngrediants = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="

var cocktailValues = {
    drinkId: "",
    drinkName: "",
    drinkImage: "",
    drinkInstructions: ""
}

var ingrediantValues = []

//event listener for the seachbuttom. this will grab the first fetch using the value typed in the textbox
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
            let data = response.text();
            return data;
        })
        .then(function(data) {
            if (data === "") {
                displayDrinkName.innerHTML = "No drinks found. Please try a different ingredient"
                displayDrinkPic.src = "https://www.creativefabrica.com/wp-content/uploads/2020/02/09/Red-Glass-Of-Wine-Cartoon-Character-Graphics-1-179-580x421.jpg";
                displayDrinkInstructions.innerHTML = "Please Try A Different Ingredient";
                displayDrinkIngregients.innerHTML = "";
            } else {
                let parsedData = JSON.parse(data);
                cocktailValues.drinkId = parsedData.drinks[0].idDrink;
                cocktailValues.drinkName = parsedData.drinks[0].strDrink;
                cocktailValues.drinkImage = parsedData.drinks[0].strDrinkThumb;
                getIngrediants(cocktailValues.drinkId)
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
            dataArray2 = {...data.drinks[0] }
                //look through data to find ingredients and measurements values and move forward
            cocktailValues.drinkInstructions = dataArray2.strInstructions
            console.log(dataArray2.strIngredient1)

            displayDrinkIngregients.innerHTML = "Ingredients: "
            dataArray = Object.entries(data.drinks[0])

            for (each of dataArray.slice(17, 32)) {
                if (each[1] === "" || each[1] === null) {

                } else {
                    console.log(each[1], dataArray[dataArray.indexOf(each) + 15][1])
                }
            }

            for (each of dataArray.slice(17, 32)) {
                if (each[1] === "" || each[1] === null) {

                } else {
                    console.log(each)
                    const newIngredient = document.createElement('div')
                    newIngredient.textContent = each[1] + ' :   ' + dataArray[dataArray.indexOf(each) + 15][1]
                    displayDrinkIngregients.append(newIngredient)
                }
            }
            displayResults();
        })
}

function displayResults() {
    displayDrinkName.textContent = cocktailValues.drinkName
    displayDrinkPic.src = cocktailValues.drinkImage
    displayDrinkInstructions.innerHTML = "Instructions: " + cocktailValues.drinkInstructions


}