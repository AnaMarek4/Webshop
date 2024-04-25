const registerButton = document.querySelector('.register-button');
const registerModal = document.getElementById('register-modal');
const closeRegisterModal = document.querySelector('.close-register');

const loginButton = document.querySelector('.login-button');
const loginModal = document.getElementById('login-modal');
const closeLoginModal = document.querySelector('.close-login');

const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const cartModal = document.querySelector('#cart-modal');
const closeCartModal = document.querySelector('.close-cart');

const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const selectElement = document.getElementById('select');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

let items = [
    {
        id: 1,
        name: 'Ghost of Tsushima',
        tag: 'Ghost_of_Tsushima',
        price: 49.99,
    },
    {
        id: 2,
        name: 'Sons of the Forest',
        tag: 'sons_of_the_forest',
        price: 29.99,  
    },
    {
        id: 3,
        name: 'Red Dead Redemption II',
        tag: 'rdr2',
        price: 59.99,
    },
    {
        id: 4,
        name: 'The Last of Us Part I',
        tag: 'the_last_of_us_part1',
        price: 59.99,
    },
    {
        id: 5,
        name: 'The Last of Us Part II',
        tag: 'the_last_of_us_part2',
        price: 69.99,
    },
    {
        id: 6,
        name: 'Watch Dogs Legion',
        tag: 'watch_dogs_legion',
        price: 49.99,
    },
    {
        id: 7,
        name: 'Counter-Strike: Global Offensive',
        tag: 'csgo',
        price: 14.29,
    },
    
    {
        id: 8,
        name: 'Resident Evil Village',
        tag: 'resident_evil_village',
        price: 39.99,
    },
    {
        id: 9,
        name: 'Resident Evil 4',
        tag: 'Resident_Evil4',
        price: 41.99,
    },
    {
        id: 10,
        name: 'Grand Theft Auto V',
        tag: 'gtaV',
        price: 19.99,
    },
    {
        id: 11,
        name: 'Hogwarts Legacy',
        tag: 'hogwarts_legacy',
        price: 43.75,
    },
    {
        id: 12,
        name: 'Far Cry 6',
        tag: 'far_cry6',
        price: 65.49,
    },
    {
        id: 13,
        name: 'Hitman: World of Assassination',
        tag: 'hitman',
        price: 69.99,
    },
    {
        id: 14,
        name: 'Assassin’s Creed Valhalla',
        tag: 'assassins_creed_valhalla',
        price: 67.89,
    },
    {
        id: 15,
        name: 'Call of Duty: Modern Warfare 2',
        tag: 'cod_mw2',
        price: 79.99,  
    },
    
]

let cart = [];

function loadCartFromSessionStorage() {
    const cartData = sessionStorage.getItem('cart');
    return JSON.parse(cartData) || []; 
}

function saveCartToSessionStorage(cart) {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function fillItemsGrid() {
    const itemsGrid = document.querySelector('.items-grid');
    if (itemsGrid) {
        for (const item of items) {
            let itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <img src="../images/${item.tag}.jpg" alt="${item.name}">
                <h1>${item.name}</h1>
                <p>${item.price} €</p>
                <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>`;
            itemsGrid.appendChild(itemElement);
        }
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => { button.addEventListener('click', addToCart); });
}


function addToCart(event) {
    const itemId = event.target.dataset.id;
    const selectedItem = items.find(item => item.id === parseInt(itemId));

    if (selectedItem) {
        const iteamInCart = cart.find(item => item.id === selectedItem.id);
        if (iteamInCart) {
            iteamInCart.quantity += 1;
        } else {
            selectedItem.quantity = 1;
            cart.push(selectedItem);
        }

        updateCart();
        saveCartToSessionStorage(cart);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
    saveCartToSessionStorage(cart);
}

function updateCart() {
    cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    for (const item of cart) {
        const cartItemElement = document.createElement('li');
        const itemTotalPrice = item.price * item.quantity;

        cartItemElement.innerHTML = `
            <span><b> ${item.name} </b> - ${item.quantity} x ${item.price} € </span>
            <span>
                $${itemTotalPrice.toFixed(2)}
                <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button> 
            </span>
        `;

        cartItemsList.appendChild(cartItemElement);

        totalPrice += itemTotalPrice;

        saveCartToSessionStorage(cart);
    }

    cartTotal.textContent = `${totalPrice.toFixed(2)} €`;
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.dataset.id);
            removeFromCart(itemId);
        });
    });
}

function resetCart() {
    cart = [];
    updateCart();
    saveCartToSessionStorage(cart);
  }

function checkout() {
    if (cart.length > 0) {
        cart = [];
        updateCart();
        alert('Thank you! Your purchase was successful.');
    } else {
        alert('Your cart is empty.');
    }
    cartModal.style.display = "none";
}

function sortByAlphabeticalAscending() {
    items.sort((a, b) => a.name.localeCompare(b.name));
    updateItemsGrid();
  }
  
function sortByAlphabeticalDescending() {
    items.sort((a, b) => b.name.localeCompare(a.name));
    updateItemsGrid();
}
  
function sortByPriceAscending(items) {
    items.sort((a, b) => a.price - b.price);
    updateItemsGrid();
}

function sortByPriceDescending(items) {
    items.sort((a, b) => b.price - a.price);
    updateItemsGrid();
}

function updateItemsGrid() {
    itemsGrid.innerHTML = '';
    fillItemsGrid();
}

let originalItems = [...items];

function resetItemsGrid() {
    items = [...originalItems];
    updateItemsGrid();
    if (selectedSortOption !== '') {
        sortItemsAndUpdateGrid();
    } else {
        updateItemsGrid();
    }
}

function searchItems() {
    const searchInputValue = searchInput.value.trim().toLowerCase();
    if (searchInputValue === '') {
      resetItemsGrid();
      return;
    }
    
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchInputValue));
    items = filteredItems;
    updateItemsGrid();
  
    const itemTitles = document.querySelectorAll('.item h1');
    itemTitles.forEach(title => {
      const originalText = title.textContent;
      const markedText = originalText.replace(new RegExp(`(${searchInputValue})`, 'gi'), '<span class="highlight">$1</span>');
      title.innerHTML = markedText;
    });
}

let selectedSortOption = '';

function sortItemsAndUpdateGrid() {
    const selectedValue = selectElement.value;
    selectedSortOption = selectedValue;
    if (selectedValue === 'LowToHigh') {
      sortByPriceAscending(items);
    } else if (selectedValue === 'HighToLow') {
      sortByPriceDescending(items);
    } else if (selectedValue === 'AtoZ') {
      sortByAlphabeticalAscending();
    } else if (selectedValue === 'ZtoA') {
      sortByAlphabeticalDescending();
    } else {
      resetItemsGrid();
    }
}

fillItemsGrid();

document.addEventListener('DOMContentLoaded', function () {
    cart = loadCartFromSessionStorage();

    if (cart.length === 0) {
        cart = [];
    }
    updateCart();
    console.log('Cart state is: ', cart)
});

closeRegisterModal.addEventListener('click', function () {
    registerModal.style.display = 'none'; 
});


loginButton.addEventListener('click', function () {
    loginModal.style.display = 'block'; 
});

closeLoginModal.addEventListener('click', function () {
    loginModal.style.display = 'none'; 
});

cartButton.addEventListener('click', function () {
    cartModal.style.display = 'block'; 
});

closeCartModal.addEventListener('click', function () {
    cartModal.style.display = 'none'; 
});

buyButton.addEventListener('click', checkout);

if (searchButton) {
    searchButton.addEventListener('click', searchItems);
}

if(selectElement){
    selectElement.addEventListener('change', sortItemsAndUpdateGrid);
}

if(searchInput){
    searchInput.addEventListener('input', searchItems);
}

