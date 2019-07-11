// // 1. Ask database for data
// fetch("http://localhost:8088/food")
// // 2. wait, using a Promise
// // 3. Receive the data
// .then(function(data) {
// // 4. Convert data to javascript (an array of objects)
//     return data.json()
// })                    //[Alternative way of writing function on lines 5-8: .then(data => data.json())]
// .then( food => {
// // 5. Loop over the array of objects
// // 6. Do stuff to the data
//     console.table(food)
//     let foodList = document.querySelector("#food-list")
//     // 7. Display the data in the DOM as HTML
//     food.forEach(item => foodList.innerHTML += `<h2>I like to eat ${item.name}</h2>`)
// })
// // *** Note different ways to write functions ***

// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.log(parsedFoods)
//         parsedFoods.forEach(food => {
//             const foodAsHTML = foodFactory(food)
//             addFoodToDom(foodAsHTML)
//         })
//     })

function foodFactory(foodObject) {
    return `
     <div>
        <h1>${foodObject.name}</h1>
        <p>Category: ${foodObject.category}</p>
        <p>Ethnicity: ${foodObject.ethnicity}</p>
        <p>Country of origin: ${foodObject.country}</p>
        <p>Calories per serving: ${foodObject.calories}</p>
        <p>Fat per serving: ${foodObject.fat}g</p>
        <p>Sugar per serving: ${foodObject.sugar}g</p>
        <p>Ingredients: ${foodObject.ingredients}</p>
    </div>
    `
}

function addFoodToDom(food) {
    // console.log(food)
    const foodList = document.querySelector(".food-list")
    foodList.innerHTML += food
}

fetch("http://localhost:8089/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }
                    food.country = productInfo.product.countries
                    food.calories = productInfo.product.nutriments.energy_serving
                    food.fat = productInfo.product.nutriments.fat_serving
                    food.sugar = productInfo.product.nutriments.sugars_serving
                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })