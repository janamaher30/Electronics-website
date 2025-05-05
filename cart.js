document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartDiv = document.getElementById('empty-cart');
    const cartPage = document.querySelector('.cart-page');
    const subtotalPrice = document.getElementById('subtotal-price');
    const totalPrice = document.getElementById('total-price');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');
    const checkoutForm = document.getElementById('checkout-form');
    
    function getCurrentCart() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            return JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
        }
        return JSON.parse(localStorage.getItem('cart')) || [];
    }
    
    function saveCart() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        updateCartUI();
    }
    
    let cart = getCurrentCart();
    
    displayCartItems();
    updateCartUI();
    
    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartDiv.style.display = 'block';
            cartPage.style.display = 'none';
            return;
        }
        
        emptyCartDiv.style.display = 'none';
        cartPage.style.display = 'block';
        
        cart.forEach((item, index) => {
            const totalPriceForItem = (item.price * item.quantity).toFixed(2);
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price per unit: ${item.price.toFixed(2)} L.E</p>
                    <div class="item-quantity">
                        <span>Quantity: ${item.quantity} units</span>
                        ${item.step ? `<p>(Pack of ${item.step})</p>` : ''}
                    </div>
                    <p>Total: ${totalPriceForItem} L.E</p>
                </div>
                <button class="remove-btn" data-index="${index}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', removeItem);
        });
        
        updateTotals();
    }
    
    function updateTotals() {
        const subtotal = cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        const shipping = 50;
        const total = subtotal + shipping;
        
        subtotalPrice.textContent = `${subtotal.toFixed(2)} L.E`;
        totalPrice.textContent = `${total.toFixed(2)} L.E`;
    }
    
    function updateCartUI() {
        if (cart.length === 0) {
            emptyCartDiv.style.display = 'block';
            cartPage.style.display = 'none';
        } else {
            emptyCartDiv.style.display = 'none';
            cartPage.style.display = 'block';
        }
    }
    
    function removeItem(e) {
        const index = e.target.closest('.remove-btn').getAttribute('data-index');
        cart.splice(index, 1);
        saveCart();
        displayCartItems();
    }
    
    clearCartBtn.addEventListener('click', function() {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (user && user.loggedIn) {
            localStorage.removeItem(`cart_${user.username}`);
        } else {
            localStorage.removeItem('cart');
        }
        
        cart = [];
        displayCartItems();
        updateCartUI();
        
        alert('Cart has been cleared successfully');
    });
    
    checkoutBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        
        if (!name || !address || !phone || !email) {
            alert('Please fill in all delivery information fields');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (phone.length < 8 || !/^\d+$/.test(phone)) {
            alert('Please enter a valid phone number');
            return;
        }
        
        alert('Order placed successfully! Thank you for your purchase.');
        
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            localStorage.removeItem(`cart_${user.username}`);
        } else {
            localStorage.removeItem('cart');
        }
        
        cart = [];
        saveCart();
        displayCartItems();
        checkoutForm.reset();
    });
  });