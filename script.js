// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const recipeList = document.getElementById('recipe-list');
    let recipes = [];
    let editingRecipeId = null;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const rating = document.getElementById('rating').value;

        if (editingRecipeId) {
            updateRecipe(editingRecipeId, title, description, rating);
        } else {
            addRecipe(title, description, rating);
        }

        form.reset();
        editingRecipeId = null;
    });

    function addRecipe(title, description, rating) {
        const id = Date.now().toString();
        recipes.push({ id, title, description, rating });
        renderRecipes();
    }

    function updateRecipe(id, title, description, rating) {
        const recipe = recipes.find(r => r.id === id);
        recipe.title = title;
        recipe.description = description;
        recipe.rating = rating;
        renderRecipes();
    }

    function deleteRecipe(id) {
        recipes = recipes.filter(r => r.id !== id);
        renderRecipes();
    }

    function editRecipe(id) {
        const recipe = recipes.find(r => r.id === id);
        document.getElementById('title').value = recipe.title;
        document.getElementById('description').value = recipe.description;
        document.getElementById('rating').value = recipe.rating;
        editingRecipeId = id;
    }

    function renderRecipes() {
        recipeList.innerHTML = '';
        recipes.forEach(recipe => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
                <p>Rating: ${recipe.rating}</p>
                <div class="actions">
                    <button class="edit" onclick="editRecipe('${recipe.id}')">Edit</button>
                    <button onclick="deleteRecipe('${recipe.id}')">Delete</button>
                </div>
            `;
            recipeList.appendChild(li);
        });
    }

    window.editRecipe = editRecipe;
    window.deleteRecipe = deleteRecipe;
});
