// global variables
const search = document.querySelector("#product");
const searchBtn = document.querySelector("#search");
const display = document.querySelector("#results")
const displayDrinkName = document.querySelector("#drinkName")
const displayDrinkPic = document.querySelector("#drinkPic")
const displayDrinkInstructions = document.querySelector("#instructions")
const displayDrinkIngregients = document.querySelector("#ingredients")
const displayDrinkNullIngregients = document.querySelectorAll("div")
const searchList = document.querySelector("#drinkHistory")
const drinkArray = JSON.parse(localStorage.getItem("drinkHistory")) || []

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
    searchList.innerHTML = "";
    creatHistoryList()
    setHistoryList()
    getcocktailId(drink);
})

// function to run the first fetch. this grabs the drink ID
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

// this function uses the second fetch to grab the drink instructions and ingredients by using the drink ID from the first fetch
function getIngrediants(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            dataArray2 = {...data.drinks[0] }
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

//this will create the local storage
function creatHistoryList() {
    var list = search.value;
    drinkArray.push(list);
    localStorage.setItem("drinkHistory", JSON.stringify(drinkArray));
}
//this will display the local storage
function setHistoryList() {
    var currentlist = JSON.parse(localStorage.getItem("drinkHistory"));
    var ul = document.createElement("ul");

    for (let i = 0; i < currentlist.length; i++) {
        const btnContent = currentlist[i];
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.id = "drinkHistoryList"
        btn.textContent = btnContent;
        ul.appendChild(li);
        li.appendChild(btn);
    }
    searchList.appendChild(ul);
}
//this is the eventlistener for the history buttons that will re-search and display weather data
searchList.addEventListener("click", function(event) {
    event.preventDefault();
    var valueDrink = event.target.textContent
    search.value = valueDrink
    getcocktailId(search.value);
    console.log(search.value)
})

setHistoryList()