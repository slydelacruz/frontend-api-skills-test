const editRecipe = (id) => {
    const title = document.querySelector('.recipe-form .title')
const description = document.querySelector('.recipe-form .description')
const servings = document.querySelector('.recipe-form .servings')
const preptime = document.querySelector('.recipe-form .preptime')
const cooktime = document.querySelector('.recipe-form .cooktime')
const ingredientname = document.querySelector('.recipe-form .name')
const amount = document.querySelector('.recipe-form .amount')
const measurement = document.querySelector('.recipe-form .measurement')
const instructions = document.querySelector('.recipe-form .instructions')
    document.querySelector('.recipe-form').classList.toggle('show')
    fetch('http://localhost:3001/recipes')
    .then(response => response.json())
    .then(data => {
        const recipe = data.find(recipe => recipe.uuid == id)
        title.value = recipe.title
        description.value = recipe.description
        servings.value = recipe.servings
        preptime.value = recipe.prepTime
        cooktime.value = recipe.cookTime

        recipe.ingredients.map(ingredient => {
            ingredientname.value=ingredient.name
            amount.value=ingredient.amount
            measurement.value=ingredient.measurement
        })

        recipe.directions.map(instruction => {
            instructions.value = instruction.instructions
        })
    })
}