const recipeForm = document.querySelector('.recipe-form')
const title = document.querySelector('.recipe-form .title')
const description = document.querySelector('.recipe-form .description')
const servings = document.querySelector('.recipe-form .servings')
const preptime = document.querySelector('.recipe-form .preptime')
const cooktime = document.querySelector('.recipe-form .cooktime')
const ingredientname = document.querySelector('.recipe-form .name')
const amount = document.querySelector('.recipe-form .amount')
const measurement = document.querySelector('.recipe-form .measurement')
const instructions = document.querySelector('.recipe-form .instructions')


recipeForm.addEventListener('submit', e => {
    e.preventDefault();

    fetch('http://localhost:3001/recipes', {
        method: 'POST',
        header: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title.value,
            description: description.value,
            servings: servings.value,
            prepTime: preptime.value,
            cookTime: cooktime.value,
            ingredients: {
                name:ingredientname.value,    
                amount:amount.value,
                measurement: measurement.value
            },
            directions: {
                instructions: instructions.value
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
})