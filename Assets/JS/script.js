// global variables
const search = document.querySelector("#product");
const searchBtn = document.querySelector("#search");
const display = document.querySelector("#results")
const displayDrinkName = document.querySelector("#drinkName")
const displayDrinkPic = document.querySelector("#drinkPic")
const displayDrinkInstructions = document.querySelector("#instructions")
const displayDrinkIngregients = document.querySelector("#ingredients")

const displayDrinkName1 = document.querySelector("#drinkName1")
const displayDrinkPic1 = document.querySelector("#drinkPic1")
const displayDrinkInstructions1 = document.querySelector("#instructions1")
const displayDrinkIngregients1 = document.querySelector("#ingredients1")

const displayDrinkName2 = document.querySelector("#drinkName2")
const displayDrinkPic2 = document.querySelector("#drinkPic2")
const displayDrinkInstructions2 = document.querySelector("#instructions2")
const displayDrinkIngregients2 = document.querySelector("#ingredients2")

const displayDrinkName3 = document.querySelector("#drinkName3")
const displayDrinkPic3 = document.querySelector("#drinkPic3")
const displayDrinkInstructions3 = document.querySelector("#instructions3")
const displayDrinkIngregients3 = document.querySelector("#ingredients3")

const displayDrinkName4 = document.querySelector("#drinkName4")
const displayDrinkPic4 = document.querySelector("#drinkPic4")
const displayDrinkInstructions4 = document.querySelector("#instructions4")
const displayDrinkIngregients4 = document.querySelector("#ingredients4")

const displayDrinkName5 = document.querySelector("#drinkName5")
const displayDrinkPic5 = document.querySelector("#drinkPic5")
const displayDrinkInstructions5 = document.querySelector("#instructions5")
const displayDrinkIngregients5 = document.querySelector("#ingredients5")

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

var cocktailValues2 = {
    0: {
        drinkId: "",
        drinkName: "",
        drinkImage: "",
        drinkInstructions: ""
    },
    1: {
        drinkId: "",
        drinkName: "",
        drinkImage: "",
        drinkInstructions: ""
    },
    2: {
        drinkId: "",
        drinkName: "",
        drinkImage: "",
        drinkInstructions: ""
    },
    3: {
        drinkId: "",
        drinkName: "",
        drinkImage: "",
        drinkInstructions: ""
    },
    4: {
        drinkId: "",
        drinkName: "",
        drinkImage: "",
        drinkInstructions: ""
    },
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
                console.log(parsedData)
                cocktailValues.drinkId = parsedData.drinks[0].idDrink;
                cocktailValues.drinkName = parsedData.drinks[0].strDrink;
                cocktailValues.drinkImage = parsedData.drinks[0].strDrinkThumb;

                cocktailValues2[0].drinkId = parsedData.drinks[1].idDrink;
                cocktailValues2[0].drinkName = parsedData.drinks[1].strDrink;
                cocktailValues2[0].drinkImage = parsedData.drinks[1].strDrinkThumb;

                cocktailValues2[1].drinkId = parsedData.drinks[2].idDrink;
                cocktailValues2[1].drinkName = parsedData.drinks[2].strDrink;
                cocktailValues2[1].drinkImage = parsedData.drinks[2].strDrinkThumb;

                cocktailValues2[2].drinkId = parsedData.drinks[3].idDrink;
                cocktailValues2[2].drinkName = parsedData.drinks[3].strDrink;
                cocktailValues2[2].drinkImage = parsedData.drinks[3].strDrinkThumb;

                cocktailValues2[3].drinkId = parsedData.drinks[4].idDrink;
                cocktailValues2[3].drinkName = parsedData.drinks[4].strDrink;
                cocktailValues2[3].drinkImage = parsedData.drinks[4].strDrinkThumb;

                cocktailValues2[4].drinkId = parsedData.drinks[5].idDrink;
                cocktailValues2[4].drinkName = parsedData.drinks[5].strDrink;
                cocktailValues2[4].drinkImage = parsedData.drinks[5].strDrinkThumb;
                getIngrediants(cocktailValues.drinkId)
                getIngrediants1(cocktailValues2[0].drinkId)
                getIngrediants2(cocktailValues2[1].drinkId)
                getIngrediants3(cocktailValues2[2].drinkId)
                getIngrediants4(cocktailValues2[3].drinkId)
                getIngrediants5(cocktailValues2[4].drinkId)
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

function getIngrediants1(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            dataArray2 = {...data.drinks[0] }
            cocktailValues2[0].drinkInstructions = dataArray2.strInstructions
            console.log(dataArray2.strIngredient1)

            displayDrinkIngregients1.innerHTML = "Ingredients: "
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
                    displayDrinkIngregients1.append(newIngredient)
                }
            }
            displayResults1();
        })
}

function getIngrediants2(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            dataArray2 = {...data.drinks[0] }
            cocktailValues2[1].drinkInstructions = dataArray2.strInstructions
            console.log(dataArray2.strIngredient1)

            displayDrinkIngregients2.innerHTML = "Ingredients: "
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
                    displayDrinkIngregients2.append(newIngredient)
                }
            }
            displayResults2();
        })
}

function getIngrediants3(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            dataArray2 = {...data.drinks[0] }
            cocktailValues2[2].drinkInstructions = dataArray2.strInstructions
            console.log(dataArray2.strIngredient1)

            displayDrinkIngregients3.innerHTML = "Ingredients: "
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
                    displayDrinkIngregients3.append(newIngredient)
                }
            }
            displayResults3();
        })
}

function getIngrediants4(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            dataArray2 = {...data.drinks[0] }
            cocktailValues2[3].drinkInstructions = dataArray2.strInstructions
            console.log(dataArray2.strIngredient1)

            displayDrinkIngregients4.innerHTML = "Ingredients: "
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
                    displayDrinkIngregients4.append(newIngredient)
                }
            }
            displayResults4();
        })
}

function getIngrediants5(id) {
    fetch(`${cocktailIngrediants}${id}`)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            dataArray2 = {...data.drinks[0] }
            cocktailValues2[4].drinkInstructions = dataArray2.strInstructions
            console.log(dataArray2.strIngredient1)

            displayDrinkIngregients5.innerHTML = "Ingredients: "
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
                    displayDrinkIngregients5.append(newIngredient)
                }
            }
            displayResults5();
        })
}

function displayResults() {
    displayDrinkName.textContent = cocktailValues.drinkName
    displayDrinkPic.src = cocktailValues.drinkImage
    displayDrinkInstructions.innerHTML = "Instructions: " + cocktailValues.drinkInstructions
}

function displayResults1() {
    displayDrinkName1.textContent = cocktailValues2[0].drinkName
    displayDrinkPic1.src = cocktailValues2[0].drinkImage
    displayDrinkInstructions1.innerHTML = "Instructions: " + cocktailValues2[0].drinkInstructions
}

function displayResults2() {
    displayDrinkName2.textContent = cocktailValues2[1].drinkName
    displayDrinkPic2.src = cocktailValues2[1].drinkImage
    displayDrinkInstructions2.innerHTML = "Instructions: " + cocktailValues2[1].drinkInstructions
}

function displayResults3() {
    displayDrinkName3.textContent = cocktailValues2[2].drinkName
    displayDrinkPic3.src = cocktailValues2[2].drinkImage
    displayDrinkInstructions3.innerHTML = "Instructions: " + cocktailValues2[2].drinkInstructions
}

function displayResults4() {
    displayDrinkName4.textContent = cocktailValues2[3].drinkName
    displayDrinkPic4.src = cocktailValues2[3].drinkImage
    displayDrinkInstructions4.innerHTML = "Instructions: " + cocktailValues2[3].drinkInstructions
}

function displayResults5() {
    displayDrinkName5.textContent = cocktailValues2[4].drinkName
    displayDrinkPic5.src = cocktailValues2[4].drinkImage
    displayDrinkInstructions5.innerHTML = "Instructions: " + cocktailValues2[4].drinkInstructions
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