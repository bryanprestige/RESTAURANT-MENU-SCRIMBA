
import FOOD from '../api/food.json' with { type: 'json' }

let totalPrice = 0

document.addEventListener('DOMContentLoaded', () => {
    showMenu()

    const completeOrderButton = document.getElementById('complete-order-button')
    completeOrderButton.addEventListener('click', displayCheckoutForm)

    const cancelButton = document.getElementById('cancel-button')
    cancelButton.addEventListener('click', hideCheckoutForm)

    const checkoutButton = document.getElementById('checkout-button')
    checkoutButton.addEventListener('click', completePayment)

    const submitRatingButton = document.getElementById('submit-rating-button')
    submitRatingButton.addEventListener('click', submitRating)

    const cancelRatingButton = document.getElementById('cancel-rating-button')
    cancelRatingButton.addEventListener('click', hideRatingForm)
})

function getTotalPrice() {
    return totalPrice;
}
  
function updateTotalPrice(newTotalPrice) {
    totalPrice = newTotalPrice;
}

function sumPrice(price) {
    let totalPrice = getTotalPrice()
    totalPrice += price;
    return totalPrice;
}

function reducePrice(price) {
    let totalPrice = getTotalPrice()
    totalPrice -= price;
    return totalPrice;
}
function showMenu() {
    const menuContainer = document.getElementById('menu-container')
    const food = Object.values(FOOD)
    food.forEach(item => {
        const foodMenu = document.createElement('food-menu')
        const itemIngredients = JSON.stringify( item.ingredients.join(', '))
        foodMenu.setAttribute('name', item.name)
        foodMenu.setAttribute('ingredients', itemIngredients)
        foodMenu.setAttribute('price', item.price)
        foodMenu.setAttribute('icon', item.icon)
        foodMenu.setAttribute('item', JSON.stringify(item))
        menuContainer.appendChild(foodMenu)
    })
}

export function addFoodToBasket(item) {
    const yourOrders = document.getElementById('your-orders')
    const price = item.price
    const yourOrdersContainer = document.createElement('div')
    yourOrdersContainer.classList.add('your-orders-container')

    const yourFood = document.createElement('h3')
    yourFood.classList.add('your-food')
    yourFood.innerText = item.name

    const foodPrice = document.createElement('h3')
    foodPrice.classList.add('food-price')
    foodPrice.innerText = `£${price}`

    const removeButton = document.createElement('button')
    removeButton.classList.add('remove-button')
    removeButton.innerText = 'Remove'

    removeButton.addEventListener('click', () => {
        reduceTotalPrice(price,removeButton)
    })

    yourOrdersContainer.append(yourFood, removeButton, foodPrice)

    yourOrders.appendChild(yourOrdersContainer)
}

export function addTotalPrice(price) {
    const totalPriceContainer = document.getElementById('total-price')
    let newTotalPrice = sumPrice(price)
    totalPriceContainer.innerText = `£${newTotalPrice}`   
    updateTotalPrice(newTotalPrice)
}

function reduceTotalPrice(price,removeButton) {
    const totalPriceContainer = document.getElementById('total-price')
    let newTotalPrice = reducePrice(price)
    totalPriceContainer.innerText = `£${newTotalPrice}`
    updateTotalPrice(newTotalPrice)
    removeButton.parentNode.remove()
    if (newTotalPrice === 0) {
        const yourOrderContainer = document.getElementById('your-order-container')
        yourOrderContainer.style.display = 'none'
    }
}

function displayCheckoutForm() {
    const modal = document.getElementById('modal')
    modal.style.display = 'block'
}

function hideCheckoutForm() {
    const modal = document.getElementById('modal')
    modal.style.display = 'none'
}


function hideRatingForm() {
    const modal = document.getElementById('modal-2')
    modal.style.display = 'none'
}
function completePayment(e) {
    e.preventDefault()
    const buyerName = document.getElementById('name').value
    hideCheckoutForm()
    const yourOrderContainer = document.getElementById('your-order-container')
    yourOrderContainer.innerHTML = `<h3 class="complete-order-message">Thanks,${buyerName}!  Your order is on its way!</h3>`
    displayRatingForm()
}

function displayRatingForm() {
    const modal = document.getElementById('modal-2')
    modal.style.display = 'block'
    const stars = document.querySelectorAll('.star')
    const currentRating = document.querySelector('.current-rating')
    stars.forEach((star, i) => {
        star.addEventListener('click', () => {
            let currenStartLevel = i + 1
            currentRating.innerText = `${currenStartLevel} of 5`
            stars.forEach((star, j) => {
                if ( currenStartLevel >=  j + 1) {
                    star.innerHTML = '&#9733'
                } else {
                    star.innerHTML = '&#9734'   
                }
            })
        })
    })
}


function submitRating() {
    hideRatingForm()
    hideMenuContainer()
    const yourOrderContainer = document.getElementById('your-order-container')
    yourOrderContainer.innerHTML = `<h3 class="complete-order-message">Thanks for rating us!</h3>`
}

function hideMenuContainer() {
    const menuContainer = document.getElementById('menu-container')
    menuContainer.style.display = 'none'
}



