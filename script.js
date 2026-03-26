// --- Food Data ---
const menuItems = [
    { id: 1, name: 'Veg Burger', category: 'veg', price: 120, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500' },
    { id: 2, name: 'Paneer Pizza', category: 'veg', price: 250, img: 'https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=500' },
    { id: 3, name: 'Pasta Carbonara', category: 'non-veg', price: 180, img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500' },
    { id: 4, name: 'French Fries', category: 'veg', price: 80, img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500' },
    { id: 5, name: 'Cold Coffee', category: 'drinks', price: 90, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500' },
    { id: 6, name: 'Ice Cream Sundae', category: 'desserts', price: 150, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500' },
    { id: 7, name: 'Chocolate Cake', category: 'desserts', price: 200, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500' },
    { id: 8, name: 'Chicken Wings', category: 'non-veg', price: 220, img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500' },
];

// --- Cart Initialization ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// --- Global Functions ---
function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

// --- Menu Rendering ---
function renderMenu(items) {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = items.map(item => `
        <div class="food-card">
            <img src="${item.img}" alt="${item.name}">
            <div class="food-info">
                <h3>${item.name}</h3>
                <p class="price">₹${item.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// --- Cart Functionality ---
function addToCart(id) {
    const item = menuItems.find(p => p.id === id);
    const existing = cart.find(p => p.id === id);
    
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast(`${item.name} added to cart!`);
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '<tr><td colspan="5" style="text-align:center">Your cart is empty.</td></tr>';
        cartTotal.innerText = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                ${item.quantity}
                <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
            </td>
            <td>₹${item.price * item.quantity}</td>
            <td><button class="btn" style="background:red; color:white;" onclick="removeItem(${item.id})">Remove</button></td>
        </tr>
    `).join('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotal.innerText = total;
}

function updateQty(id, change) {
    const item = cart.find(p => p.id === id);
    item.quantity += change;
    if (item.quantity <= 0) return removeItem(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// --- Filtering & Search ---
function filterMenu(category) {
    const btns = document.querySelectorAll('.filter-btns .btn');
    btns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        renderMenu(menuItems);
    } else {
        const filtered = menuItems.filter(item => item.category === category);
        renderMenu(filtered);
    }
}

function searchMenu() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filtered = menuItems.filter(item => item.name.toLowerCase().includes(query));
    renderMenu(filtered);
}

// --- Mobile Nav ---
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// --- On Load ---
window.onload = () => {
    updateCartCount();
    if (document.getElementById('menu-grid')) renderMenu(menuItems);
    if (document.getElementById('cart-items')) renderCart();
};