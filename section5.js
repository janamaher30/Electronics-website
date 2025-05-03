document.addEventListener('DOMContentLoaded', function() {
    function getUserCart() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            return JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
        }
        return [];
    }
    function saveUserCart(cart) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
            updateCartCount();
        } else {
            alert('Please login to save your cart items');
            window.location.href = 'login.html';
        }
    }
    function updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        if (cartCountElements.length > 0) {
            const cart = getUserCart();
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCountElements.forEach(el => {
                el.textContent = totalItems > 0 ? totalItems : '';
                el.style.display = totalItems > 0 ? 'block' : 'none';
            });
        }
    }
        document.querySelectorAll('[class^="card"]').forEach(card => {
        const plusBtn = card.querySelector('.plus');
        const minusBtn = card.querySelector('.minus');
        const quantitySpan = card.querySelector('.quantity');
        const addToCartBtn = card.querySelector('.Add-To-Cart button');
        const messageDiv = card.querySelector('.message');
        const productName = card.querySelector('h2').textContent;
        const priceText = card.querySelector('.price').textContent;
        const productPrice = parseFloat(priceText.replace(/[^\d.]/g, ''));
        
        let quantity = 1;
        if (quantitySpan) {
            quantitySpan.textContent = quantity;
        }
                if (plusBtn) {
            plusBtn.addEventListener('click', () => {
                quantity++;
                if (quantitySpan) quantitySpan.textContent = quantity;
            });
        }
        if (minusBtn) {
            minusBtn.addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    if (quantitySpan) quantitySpan.textContent = quantity;
                }
            });
        }
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.loggedIn) {
                    alert('Please login first to add items to cart');
                    window.location.href = 'login.html';
                    return;
                }

                let cart = getUserCart();
                const productId = `${productName}-${productPrice}`.replace(/\s+/g, '-');
                
                const existingIndex = cart.findIndex(item => item.id === productId);
                
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += quantity;
                } else {
                    cart.push({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        quantity: quantity,
                        priceText: priceText.trim(),
                        addedAt: new Date().toISOString()
                    });
                }
                
                saveUserCart(cart);
                
                if (messageDiv) {
                    messageDiv.textContent = `Added ${quantity} ${productName} to cart!`;
                    messageDiv.style.display = 'block';
                    
                    setTimeout(() => {
                        messageDiv.style.display = 'none';
                    }, 2000);
                }
                quantity = 1;
                if (quantitySpan) quantitySpan.textContent = quantity;
            });
        }
    });

    updateCartCount();

    window.addEventListener('storage', function(e) {
        if (e.key && e.key.startsWith('cart_')) {
            updateCartCount();
        }
    });
});