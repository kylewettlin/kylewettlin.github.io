class Pizza {
    constructor(name, image, ingredients, sauce, cheese, price, calories, cookTime) {
        this.name = name;
        this.image = image;
        this.ingredients = ingredients;
        this.sauce = sauce;
        this.cheese = cheese;
        this.price = price;
        this.calories = calories;
        this.cookTime = cookTime;
    }

    getSection() {
        return `
            <div class="pizza-section" onclick="showPizzaDetails('${this.name}')">
                <h3>${this.name}</h3>
                <img src="images/pizzas/${this.image}" alt="${this.name}" class="pizza-img" onerror="this.onerror=null; this.src=''; this.alt='Pizza image not found'; this.classList.add('missing-img');">
            </div>
        `;
    }

    getModalContent() {
        const modalColor = this.getModalColor();
        
        return `
            <div class="modal-header" style="background-color: ${modalColor};">
                <h2>${this.name}</h2>
            </div>
            <img src="images/pizzas/${this.image}" alt="${this.name}" class="modal-pizza-img rotate-animation" onerror="this.onerror=null; this.src=''; this.alt='Pizza image not found'; this.classList.add('missing-img');">
            <div class="modal-info">
                <div class="label">Ingredients:</div>
                <div class="value">${this.ingredients}</div>
                
                <div class="label">Sauce:</div>
                <div class="value">${this.sauce}</div>
                
                <div class="label">Cheese:</div>
                <div class="value">${this.cheese}</div>
                
                <div class="label">Price:</div>
                <div class="value">$${this.price.toFixed(2)}</div>
            </div>
        `;
    }

    getModalColor() {
        const colorMap = {
            'Hawaiian': '#ff9933',
            'Buffalo Chicken Ranch': '#e65c00',
            'Margarita': '#ff6600',
            'Pepperoni': '#cc0000',
            'Veggie': '#339933'
        };
        
        return colorMap[this.name] || '#ff6600'; 
    }
}

const pizzas = [
    new Pizza(
        'Hawaiian', 
        'hawaiian.jpg', 
        'Ham, Pineapple, Bacon', 
        'Tomato Sauce', 
        'Mozzarella',
        18.99,
        276,
        12
    ),
    new Pizza(
        'Buffalo Chicken Ranch', 
        'buffalo-chicken.jpg', 
        'Chicken, Ranch, Hot Sauce, Onions', 
        'Buffalo Ranch', 
        'Mozzarella and Cheddar',
        20.99,
        315,
        14
    ),
    new Pizza(
        'Margarita', 
        'margarita.jpg', 
        'Basil, Tomatoes', 
        'Extra Virgin Olive Oil', 
        'Fresh Mozzarella',
        19.20,
        240,
        10
    ),
    new Pizza(
        'Pepperoni', 
        'pepperoni.jpg', 
        'Pepperoni, Italian Seasonings', 
        'Tomato Sauce', 
        'Mozzarella',
        17.50,
        290,
        11
    ),
    new Pizza(
        'Veggie', 
        'veggie.jpg', 
        'Bell Peppers, Mushrooms, Olives, Onions, Tomatoes', 
        'Tomato Sauce', 
        'Mozzarella',
        19.99,
        230,
        13
    )
];

function init() {
    const pizzaContainer = document.getElementById('pizza-container');
    let pizzaHTML = '';
    for (const pizza of pizzas) {
        pizzaHTML += pizza.getSection();
    }
    
    pizzaContainer.innerHTML = pizzaHTML;
}

function showPizzaDetails(pizzaName) {
    const pizza = pizzas.find(p => p.name === pizzaName);
    const modalContent = document.getElementById('modal-content');
    const modal = document.getElementById('pizza-modal');
    
    if (pizza) {
        modalContent.innerHTML = pizza.getModalContent();
        modal.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', init); 