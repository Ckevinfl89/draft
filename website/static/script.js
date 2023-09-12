document.getElementById("searchButton").addEventListener("click", searchRecipes);

function glucose(num){
let key = {
    min:0, 
    max:0
};
if (num < 70){
    key.min=5;
    key.max=15;
}
else if (num>125){
    key.min=0;
    key.max=3;
}
else {key.min=3;
      key.max=5
}return key
}

function searchRecipes() {

  const searchInput = document.getElementById("searchInput").value;
  const key = glucose(searchInput);
  const apiKey = "f7173e8545ff4df988b3e04ebda34d21";
  const endpoint = `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${apiKey}&minCarbs=${key.min}&maxCarbs=${key.max}&number=12`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
    .catch(error => {
      console.error("Error fetching recipes:", error);
    });
}


function displayResults(recipes) {
  const resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const resultElement = document.createElement("div");
    resultElement.classList.add("result");

    const imageElement = document.createElement("img");
    imageElement.src = recipe.image;

    const titleElement = document.createElement("h3");
    // Create a link to a Google search for the recipe title
    const googleSearchLink = document.createElement("a");
    googleSearchLink.textContent = recipe.title;
    googleSearchLink.href = `https://www.google.com/search?q=${encodeURIComponent(recipe.title)}`;
    googleSearchLink.target = "_blank"; // Open link in a new tab

    const detailsElement = document.createElement("p");
    detailsElement.textContent = `Calories: ${recipe.calories} | Protein: ${recipe.protein} | Fat: ${recipe.fat} | Carbs: ${recipe.carbs}`;

    titleElement.appendChild(googleSearchLink);

    resultElement.appendChild(imageElement);
    resultElement.appendChild(titleElement);
    resultElement.appendChild(detailsElement);

    resultsContainer.appendChild(resultElement);
  });
}
