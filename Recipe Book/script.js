document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const recipesContainer = document.getElementById('recipesContainer');
    const searchBar = document.getElementById('searchBar');

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Display Recipes
    const displayRecipes = (recipeArray) => {
        recipesContainer.innerHTML = '';
        recipeArray.forEach((recipe, index) => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
                <h3>${recipe.name}</h3>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                <p><strong>Steps:</strong> ${recipe.steps}</p>
                <button class="editBtn" data-index="${index}">Edit</button>
                <button class="deleteBtn" data-index="${index}">Delete</button>
            `;
            recipesContainer.appendChild(recipeDiv);
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.addEventListener('click', deleteRecipe);
        });

        document.querySelectorAll('.editBtn').forEach(button => {
            button.addEventListener('click', editRecipe);
        });
    };

    // Function to handle adding a recipe
const addRecipe = (e) => {
    e.preventDefault();

    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());
    const steps = document.getElementById('steps').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    // Check if all required fields are filled (name, ingredients, steps, and image)
    if (!recipeName || ingredients.length === 0 || !steps || !imageUpload) {
        alert('Please fill out all fields and upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onloadend = function () {
        const newRecipe = {
            name: recipeName,
            ingredients,
            steps,
            image: reader.result
        };

        // Add new recipe to the recipes array and localStorage
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        resetForm();
        displayRecipes(recipes);
    };

    // Read the image file
    reader.readAsDataURL(imageUpload);
};

    // Delete Recipe
    const deleteRecipe = (e) => {
        const recipeIndex = e.target.getAttribute('data-index');
        if (confirm('Are you sure you want to delete this recipe?')) {
            recipes.splice(recipeIndex, 1);
            localStorage.setItem('recipes', JSON.stringify(recipes));
            displayRecipes(recipes);
        }
    };

    // Function to handle editing a recipe
const editRecipe = (e) => {
    const recipeIndex = e.target.getAttribute('data-index');
    const recipe = recipes[recipeIndex];

    // Populate form with recipe details
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('ingredients').value = recipe.ingredients.join(', ');
    document.getElementById('steps').value = recipe.steps;

    // Scroll to the form when edit is clicked
    document.getElementById('addRecipe').scrollIntoView({ behavior: 'smooth' });

    // Change button text to 'Update Recipe' and add update class
    const submitButton = recipeForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Update Recipe';
    submitButton.classList.add('updateBtn');

    // Remove previous 'addRecipe' listener to avoid conflicts
    recipeForm.removeEventListener('submit', addRecipe);

    // Add 'updateRecipe' listener to handle updating
    recipeForm.addEventListener('submit', (event) => updateRecipe(event, recipeIndex));
};

// Function to update the existing recipe
const updateRecipe = (e, recipeIndex) => {
    e.preventDefault();
    
    // Get updated values from form inputs
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());
    const steps = document.getElementById('steps').value;

    const reader = new FileReader();
    
    // When the image is loaded (if new image is selected)
    reader.onloadend = function () {
        const updatedRecipe = {
            name: recipeName,
            ingredients,
            steps,
            
        };

        // Update recipe in the array and localStorage
        recipes[recipeIndex] = updatedRecipe;
        localStorage.setItem('recipes', JSON.stringify(recipes));
        
        // Reset form after update
        resetForm();
        displayRecipes(recipes);
    };

    // If a new image is uploaded, read it
    if (imageUpload) {
        reader.readAsDataURL(imageUpload);
    } else {
        // If no new image is uploaded, just update text fields
        const updatedRecipe = {
            name: recipeName,
            ingredients,
            steps,
            image: recipes[recipeIndex].image // Keep old image if not changed
        };

        // Update recipe in the array and localStorage
        recipes[recipeIndex] = updatedRecipe;
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Reset form after update
        resetForm();
        displayRecipes(recipes);
    }
};

// Function to reset the form and button after an update
const resetForm = () => {
    document.getElementById('recipeForm').reset();  // Clear form inputs

    const submitButton = recipeForm.querySelector('button[type="submit"]');
    submitButton.textContent = 'Add Recipe';  // Change button text back to 'Add Recipe'
    submitButton.classList.remove('updateBtn');  // Remove update class

    // Reattach the original 'addRecipe' listener
    recipeForm.removeEventListener('submit', updateRecipe);
    recipeForm.addEventListener('submit', addRecipe);
};

    

    // Search Recipes
    const searchRecipes = (e) => {
        const query = e.target.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query) || 
                   recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query));
        });
        displayRecipes(filteredRecipes);
    };

    // Event Listeners
    recipeForm.addEventListener('submit', addRecipe);
    searchBar.addEventListener('input', searchRecipes);

    // Initial display of recipes
    displayRecipes(recipes);
});
