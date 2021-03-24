const getRecipeList = () => {
    fetch('http://localhost:3001/recipes')
        .then(response => response.json())
        .then(data => {
            const recipe = data.map(recipe => {
                if(recipe.images != undefined) {
                return `
                    <div class="recipe" >
                        <div class="recipe__image" style="background-image:url('${recipe.images.full}')"></div>
                        <div class=recipe__description>
                            <h2 class="recipe__title">${recipe.title}</h2>
                            <p class="recipe__text">${recipe.description}</p>
                            <button id=${recipe.uuid} onclick=getRecipeDetails(this.id) class="btn-more">Learn more</button>
                        </div>
                    </div>
                `
            }
            }).join("")
            document.querySelector('.app').insertAdjacentHTML('afterbegin', recipe)

        }).catch(error => {
            console.log(error);
        });
}

const getRecipeDetails = id => {
    document.querySelector('body').classList.toggle('scroll-disabled')
    document.querySelector('.app').classList.toggle('blur')

    fetch('http://localhost:3001/recipes')
        .then(response => response.json())

        .then(data => {
            const detail = data.find(details => details.uuid == id)

            const direction = detail.directions.map((direction, i) => {
                return `
                    <li><span>${i + 1}.</span> ${direction.instructions}</li>
                    `
            }).join("")

            const ingredients = detail.ingredients.map(ingredient => {
                return `
                          
                        <li ingredient-id=${ingredient.uuid}>
                          <svg aria-hidden="true" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#dc2430" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>
                            <div class="ingredients__content">
                            <p class="ingredients__name">${ingredient.name}<span class="amount"> - (${ingredient.amount})</span> <span class="measurement">${ingredient.measurement}</span> </p>
                        </li>

                        `
            }).join("")

            const details =
                `
                <div class="recipe-overlay">
                    <div class="recipe-details">
                        <button onclick=closeDetails() class="recipe-details__close">close</button>
                        <div class="recipe-details__content">
                        <div class="recipe-details__header">
                        <h2>${detail.title}</h2>
                        <div class="recipe-details__sub-title">
                            <p>Cook Time: <span>${detail.cookTime} mins.</span></p>
                            <p>Preparation Time: <span>${detail.prepTime} mins.</span></p>
                            <p>Servings: <span>${detail.servings}</span></p>
                        </div>
                        </div>
                        
                        

                        <h4>Directions:</h4>
                        <ul class="directions">
                        ${direction}
                        </ul>

                        <h4>Ingredients:</h4>
                        <ul class="ingredients">
                        ${ingredients}
                        </ul>
                        </div>
                    </div>
                </div>
            `
            document.querySelector('body').insertAdjacentHTML('afterbegin', details)
        })

        getSpecials() 
}

const closeDetails = () => {
    document.querySelector('body').classList.toggle('scroll-disabled')
    document.querySelector('.recipe-overlay').remove()
    document.querySelector('.app').classList.toggle('blur')
}

const getSpecials = () => {
    
    fetch('http://localhost:3001/specials')
        .then(response => response.json())
        .then(data => {
            const ingredientElem = document.querySelectorAll('.ingredients li')
            ingredientElem.forEach(elem => {
                const elemIngredientId = elem.getAttribute("ingredient-id")

                const specials = data.find(ingredient => ingredient.ingredientId == elemIngredientId)
                
                if (specials != undefined) {
                    const specialsCode = specials.code != undefined ? `<span class="promo-code"> - ${specials.code}</span>` : ''
                    const special = `
                        <div class="special-event">
                        <svg aria-hidden="true" data-prefix="fas" data-icon="exclamation-circle" class="svg-inline--fa fa-exclamation-circle fa-w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>
                        <div>
                        <h5>${specials.title}<span> (${specials.type})</span>${specialsCode}</h5> 
                        <p>${specials.text}</p>
                        </div>

                        </div>
                    `
                
                document.querySelector(`[ingredient-id="${specials.ingredientId}"] .ingredients__content .ingredients__name`).insertAdjacentHTML('afterend', special)
            }
            })
            
        }).catch(error => {
            console.log(error);
        });
}


getRecipeList()
