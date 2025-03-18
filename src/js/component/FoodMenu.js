import { LitElement, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js';
import css from '../../css/main.css' with { type: 'css' }
import { addFoodToBasket, addTotalPrice } from '../main.js';

/**
 * Food Menu Web Component
 * @class Food Menu
 * @emits 'food-menu'
 */

export class FoodMenu extends LitElement {
    
    static styles = [css];
    static properties = {
        item: { type: String },
        icon: { type: String },
        name: { type: String },
        ingredients: { type: Array },
        price: { type: Number }
    }

    constructor() {
        super();
    }
    
    connectedCallback() {
        super.connectedCallback();
    }   
   
    render() {    
    return html`
        <div class="menu">
           <img class="food-icon" src="./${this.icon}">
           <div class="food-info">
                <h3 class="food-name">${this.name}</h3>
                <h4 class="ingredients">${this.ingredients}</h4>
                <h5 class="price">£${this.price}</h5>
           </div>
           <button class="plus-button" @click=${this._addFood}>
            <img class="plus-icon" src="./assets/plus-icon.png">
           </button>
        </div>
        `
    }

    /*=======PRIVATE METHODS=======*/

     _addFood() {
        const yourOrderContainer = document.getElementById('your-order-container')
        yourOrderContainer.style.display = 'block';
        const item = JSON.parse(this.item)
        const price = item.price
        addFoodToBasket(item)
        addTotalPrice(price)
    }


}
customElements.define('food-menu', FoodMenu)