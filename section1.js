document.addEventListener('DOMContentLoaded', function() {
    function getCurrentCart() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            return JSON.parse(localStorage.getItem(`cart_${user.username}`)) || [];
        }
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.loggedIn) {
            localStorage.setItem(`cart_${user.username}`, JSON.stringify(cart));
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCurrentCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('.cart-count');
        
        cartCountElements.forEach(el => {
            el.textContent = totalItems > 0 ? totalItems : '';
            el.style.display = totalItems > 0 ? 'inline-block' : 'none';
        });
    }

    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const quantityElement = productElement.querySelector('.quantity');
            let quantity = parseInt(quantityElement.textContent);
            const step = parseInt(productElement.dataset.step);
            
            if (this.classList.contains('plus')) {
                quantity += step;
            } else if (this.classList.contains('minus')) {
                quantity = Math.max(step, quantity - step);
            }
            
            quantityElement.textContent = quantity;
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.loggedIn) {
                alert('Please login first to add items to cart');
                window.location.href = 'login.html';
                return;
            }

            const productElement = this.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.querySelector('.description').textContent;
            const productPriceText = productElement.querySelector('.Price').textContent;
            const productPrice = parseFloat(productPriceText.replace('Price: ', '').replace(' L.E', '').trim());
            const productQuantity = parseInt(productElement.querySelector('.quantity').textContent);
            const step = parseInt(productElement.dataset.step);
            const productImage = productElement.querySelector('img').src;

            const pricePerUnit = productPrice / step;
            
            let cart = getCurrentCart();
            
            const existingProductIndex = cart.findIndex(item => item.id === productId);
            
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += productQuantity;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: pricePerUnit,
                    quantity: productQuantity,
                    image: productImage,
                    step: step
                });
            }
            
            saveCart(cart);
            alert(`${productQuantity} of ${productName} added to cart`);
            productElement.querySelector('.quantity').textContent = step;
            
            updateCartCount();
        });
    });

    updateCartCount();
});
document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    let index = 0;
    const delay = parseInt(carousel.dataset.delay) || 3000;
    setInterval(() => {
      images[index].classList.remove('active');
      index = (index + 1) % images.length;
      images[index].classList.add('active');
    }, delay);
  });