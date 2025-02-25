const resultContainer = document.getElementById("result");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchContainer = document.querySelector(".search-box");

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Event listeners for search and enter key
searchBtn.addEventListener("click", searchMeal);
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchMeal();
    }
});

async function searchMeal() {
    const userInput = searchInput.value.trim();
    if (!userInput) {
        resultContainer.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
        return;
    }
    
    try {
        const response = await fetch(apiUrl + userInput);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        if (!data.meals) {
            resultContainer.innerHTML = `<h3>No Meal Found, Please Try Again!</h3>`;
            return;
        }
        
        displayMeal(data.meals[0]);
    } catch (error) {
        console.error("Error fetching data:", error);
        resultContainer.innerHTML = `<h3>Error fetching data!</h3>`;
    }
}

function displayMeal(meal) {
    const ingredients = getIngredients(meal);
    resultContainer.innerHTML = `
        <div class="details">
            <h2>${meal.strMeal}</h2>
            <h4>${meal.strArea}</h4>
        </div>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div id="ingre-container">
            <h3>Ingredients:</h3>
            <ul>${ingredients}</ul>
        </div>
        <div id="recipe" style="display: none;">
            <button id="hide-recipe">X</button>
            <pre id="instructions">${meal.strInstructions}</pre>
        </div>
        <button id="show-recipe">View Recipe</button>
    `;
    
    document.getElementById("hide-recipe").addEventListener("click", hideRecipe);
    document.getElementById("show-recipe").addEventListener("click", showRecipe);
    
    searchContainer.style.opacity = '0';
    searchContainer.style.display = 'none';
}

function getIngredients(meal) {
    return Array.from({ length: 20 }, (_, i) => i + 1)
        .map(i => {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            return ingredient ? `<li>${measure} ${ingredient}</li>` : "";
        })
        .join("");
}

function hideRecipe() {
    document.getElementById("recipe").style.display = "none";
}

function showRecipe() {
    document.getElementById("recipe").style.display = "block";
}

console.log("script.js başarıyla yüklendi!");
