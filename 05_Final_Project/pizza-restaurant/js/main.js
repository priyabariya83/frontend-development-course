// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');
const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartClose = document.querySelector('.cart-close');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const totalPrice = document.querySelector('.total-price');
const checkoutBtn = document.querySelector('.btn-checkout');
const backToTop = document.querySelector('.back-to-top');
const newsletterForm = document.querySelector('.newsletter-form');
const specialOrderBtn = document.querySelector('.btn-special-order');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Menu Category Filtering
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.dataset.category;
        
        // Filter menu items
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Pizza Data
const pizzaData = {
    1: { name: "Classic Margherita", price: 14.99, image: "pizza-2.jpg" },
    2: { name: "Double Pepperoni", price: 17.99, image: "pizza-3.jpg" },
    3: { name: "Veggie Delight", price: 16.99, image: "pizza-4.jpg" },
    4: { name: "BBQ Chicken", price: 18.99, image: "pizza-5.jpg" },
    5: { name: "Truffle Mushroom", price: 22.99, image: "pizza-6.jpg" },
    6: { name: "Meat Feast", price: 20.99, image: "pizza-7.jpg" },
    7: { name: "Four Cheese", price: 17.99, image: "pizza-8.jpg" },
    8: { name: "Hawaiian Special", price: 16.99, image: "pizza-1.jpg" }
};

// Add to Cart Functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const pizzaId = btn.dataset.id;
        addToCart(pizzaId);
    });
});

// Special Order Button
if (specialOrderBtn) {
    specialOrderBtn.addEventListener('click', () => {
        addToCart('special');
        showNotification('Special pizza added to cart!');
    });
}

function addToCart(pizzaId) {
    let pizza;
    
    if (pizzaId === 'special') {
        pizza = {
            id: 'special',
            name: "Paradise Supreme Pizza",
            price: 19.99,
            image: "hero-bg.jpg"
        };
    } else {
        pizza = pizzaData[pizzaId];
        pizza.id = pizzaId;
    }
    
    // Check if pizza is already in cart
    const existingItem = cart.find(item => item.id === pizza.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        pizza.quantity = 1;
        cart.push(pizza);
    }
    
    // Update cart UI and localStorage
    updateCart();
    saveCartToLocalStorage();
    showNotification(`${pizza.name} added to cart!`);
}

function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items display
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPrice.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">
                    <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="cart-item-decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="cart-item-increase" data-id="${item.id}">+</button>
                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total price
    totalPrice.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.cart-item-decrease').forEach(btn => {
        btn.addEventListener('click', () => updateCartItemQuantity(btn.dataset.id, -1));
    });
    
    document.querySelectorAll('.cart-item-increase').forEach(btn => {
        btn.addEventListener('click', () => updateCartItemQuantity(btn.dataset.id, 1));
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
    });
}

function updateCartItemQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
        
        updateCart();
        saveCartToLocalStorage();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
    saveCartToLocalStorage();
    showNotification('Item removed from cart');
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cart Sidebar Toggle
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

cartClose.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Checkout Button
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nThis is a demo site. In a real application, this would proceed to checkout.`);
    
    // Clear cart
    cart = [];
    updateCart();
    saveCartToLocalStorage();
    cartSidebar.classList.remove('active');
});

// Countdown Timer for Special Offer
function updateCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!hoursEl || !minutesEl || !secondsEl) return;
    
    // Set the target date (24 hours from now)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);
    
    function update() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            // Offer expired
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately and then every second
    update();
    setInterval(update, 1000);
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Newsletter Form
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // In a real application, you would send this to a server
        newsletterForm.reset();
        showNotification('Thank you for subscribing to our newsletter!');
    });
}

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--success-color)';
    notification.style.color = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '2000';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Update cart from localStorage
    updateCart();
    
    // Start countdown timer
    updateCountdown();
    
    // Add animation to menu items
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});