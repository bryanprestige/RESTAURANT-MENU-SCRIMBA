
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
})

function showMenu() {
    const menuContainer = document.getElementById('menu-container')
    const food = Object.values(FOOD)
    food.forEach(item => {
        console.log(item, 'item')

        const foodMenu = document.createElement('food-menu')
        const itemIngredients = JSON.stringify( item.ingredients.join(', '))
        console.log(itemIngredients, 'itemIngredients')
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
    totalPrice += price
    totalPriceContainer.innerText = `£${totalPrice}`
}

function reduceTotalPrice(price,removeButton) {
    const totalPriceContainer = document.getElementById('total-price')
    totalPrice -= price
    totalPriceContainer.innerText = `£${totalPrice}`
    removeButton.parentNode.remove()
    if (totalPrice === 0) {
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

function completePayment(e) {
    e.preventDefault()
    const buyerName = document.getElementById('name').value
    hideCheckoutForm()

    const yourOrderContainer = document.getElementById('your-order-container')
    yourOrderContainer.innerHTML = `<h3 class="complete-order-message">Thanks,${buyerName}!  Your order is on its way!</h3>`

}




