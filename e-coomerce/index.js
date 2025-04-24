// Sample product data
const products = [
    {
        id: 1,
        title: "Mens-t-shirt",
        price: 99.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNDsdtSNq-KckAb04BaWG2Ebh-EWQL-piY_5RNpX3WvlaXT-qTBJuHCuKJ7b6izIY6kM8&usqp=CAU",
        description: "Crew Neck Short Sleeve Combed Cotton Men's T-shirt "
    },
    {
        id: 2,
        title: "Smart Watch",
        price: 199.99,
        image: "https://public.assets.hmgroup.com/assets/006/10/40/1040d64b78f0b4f6e6c8e45c1deb3af14e4d1a3d_xl-1.jpg",
        description: "relaxed-tshirts sleeve Combed"
    },
    {
        id: 3,
        title: "Bluetooth Speaker",
        price: 79.99,
        image: "https://m.media-amazon.com/images/I/71x4QMTf7EL._AC_UF1000,1000_QL80_.jpg",
        description: "Portable Bluetooth speaker with 20-hour battery life."
    },
    {
        id: 4,
        title: "Laptop Backpack",
        price: 49.99,
        image: "https://www.justbags.in/cdn/shop/files/DSC01783.jpg?v=1722870280&width=533",
        description: "Durable backpack with laptop compartment and USB charging port."
    },
    {
        id: 5,
        title: "https://hammeronline.in/cdn/shop/files/Bash_2.0_Bluetooth_Headphones.webp?v=1726899059",
        price: 29.99,
        image: "https://rukminim2.flixcart.com/image/850/1000/l41n2q80/mouse/0/c/k/-original-imagfffqwbhkausu.jpeg?q=90&crop=falsee",
        description: "Ergonomic wireless mouse with long battery life."
    },
    {
        id: 6,
        title: "External Hard Drive",
        price: 89.99,
        image: "https://img.tatacliq.com/images/i11/437Wx649H/MP000000005948835_437Wx649H_202306071934511.jpeg",
        description: "1TB portable external hard drive with USB 3.0."
    }
];

// Cart functionality
let cart = [];

// DOM elements
const productGrid = document.querySelector('.product-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.querySelector('.cart-modal');
const closeCart = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalAmount = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal if open
    if (cartModal.style.display === 'block') {
        renderCartItems();
    }
}

// Render cart items in modal
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalAmount.textContent = '0';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
            </div>
            <i class="fas fa-trash remove-item" data-id="${item.id}"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
        
        total += item.price * item.quantity;
    });
    
    totalAmount.textContent = total.toFixed(2);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Decrease item quantity
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

// Increase item quantity
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

// Remove item from cart
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert(`Thank you for your purchase! Total: $${totalAmount.textContent}`);
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
}

// Event listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderCartItems();
});

closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

checkoutBtn.addEventListener('click', checkout);

// Initialize the page
displayProducts();