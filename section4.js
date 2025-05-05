document.addEventListener('DOMContentLoaded', function() {
    // Helper functions for cart management
    function getUserCart() {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            return JSON.parse(localStorage.getItem('cart_' + user.username)) || [];
        }
        return [];
    }

    function saveUserCart(cart) {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            localStorage.setItem('cart_' + user.username, JSON.stringify(cart));
        } else {
            alert('Please login to save your cart items');
            window.location.href = 'login.html';
        }
    }

    function updateCartCount() {
        var cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            var cart = getUserCart();
            var totalItems = cart.reduce(function(sum, item) {
                return sum + item.quantity;
            }, 0);
            cartCount.textContent = totalItems > 0 ? totalItems : '';
        }
    }

    // Product quantity and cart management
    document.querySelectorAll('.product').forEach(function(product) {
        var minusBtn = product.querySelector('.minus');
        var plusBtn = product.querySelector('.plus');
        var quantitySpan = product.querySelector('.quantity');
        var addToCartBtn = product.querySelector('.add-to-cart');
        var messageDiv = product.querySelector('.message');
        var colorSelect = product.querySelector('.led-color');
        var productName = product.querySelector('h2').textContent;
        var productPrice = product.querySelector('p').textContent;

        var quantity = parseInt(quantitySpan.textContent) || 1;
        var selectedColor = '';

        // Color selection handling
        if (colorSelect) {
            selectedColor = colorSelect.value;
            colorSelect.addEventListener('change', function(e) {
                selectedColor = e.target.value;
            });
        }

        // Quantity controls
        plusBtn.addEventListener('click', function() {
            quantity++;
            quantitySpan.textContent = quantity;
        });

        minusBtn.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        });

        // Add to cart functionality
        addToCartBtn.addEventListener('click', function() {
            var user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.loggedIn) {
                alert('Please login first to add items to cart');
                window.location.href = 'login.html';
                return;
            }

            var cart = getUserCart();
            var priceValue = parseFloat(productPrice.replace(/[^\d.]/g, ''));

            var productData = {
                // id: productName + '-' + Date.now(),
                name: selectedColor ? productName + ' - ' + selectedColor : productName,
                price: priceValue,
                quantity: quantity,
                priceText: productPrice,
                color: selectedColor || null,
                // addedAt: new Date().toISOString()
            };

            var existingIndex = cart.findIndex(function(item) {
                return item.name === productData.name && 
                      (!item.color || item.color === productData.color);
            });

            if (existingIndex > -1) {
                cart[existingIndex].quantity += quantity;
            } else {
                cart.push(productData);
            }

            saveUserCart(cart);
            updateCartCount();

            messageDiv.textContent = 'Added ' + quantity + ' ' + productData.name + ' to cart.';
            messageDiv.style.display = 'block';
        });
    });

    // Initial setup
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
});