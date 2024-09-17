# Recipe Book Web Application

## Overview

The Recipe Book web application allows users to manage their recipes. Users can add, view, update, delete, and search for recipes. Each recipe includes a name, ingredients, preparation steps, and an image of the finished dish. Recipes are stored locally in the browser using `localStorage`.

## Features

- **Add Recipes**: Users can add new recipes with a name, ingredients, preparation steps, and an image.
- **View Recipes**: Display all added recipes in a clear, organized format.
- **Edit Recipes**: Modify existing recipes, including updating the image if desired.
- **Delete Recipes**: Remove recipes from the list.
- **Search Recipes**: Search for recipes by name or ingredient.
- **Persistent Storage**: Recipes are stored locally and persist across sessions.

## Technologies Used

- **HTML**: Structure and layout of the web application.
- **CSS**: Styling and visual design of the application.
- **JavaScript**: Interactivity, including form handling, localStorage management, and dynamic updates.

## Getting Started

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari)

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/yourusername/recipe-book.git
   cd recipe-book
2. Open the Application

    The project does not require any build tools or package managers. Simply open the index.html file in your preferred web browser:

    Windows/Linux: Right-click on index.html and select "Open with" followed by your web browser.
    macOS: Right-click on index.html and select "Open With" followed by your web browser.
3. Running the Application

    Since this application is a static website, no server is required. You can run it directly by opening the index.html file in your browser.

## Usage
    Adding a Recipe

    Enter the recipe name, ingredients (comma-separated), preparation steps, and upload an image.
    Viewing Recipes

    Recipes are displayed in a list format with their details and image.
    Editing a Recipe

    Click the "Edit" button next to the recipe you want to update.
    Modify the details in the form. Note: Image input will be hidden during editing.
    Click "Update Recipe" to save changes.
    Deleting a Recipe

    Click the "Delete" button next to the recipe you want to remove.
    Confirm the deletion when prompted.
    Searching Recipes

    Use the search bar to find recipes by name or ingredient.
## Code Structure
    index.html: Main HTML file with the structure of the application.
    styles.css: Contains styles for the application.
    script.js: JavaScript file with functionality for adding, editing, deleting, searching, and displaying recipes.