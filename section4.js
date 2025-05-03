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
      } else {
          alert('Please login to save your cart items');
          window.location.href = 'login.html';
      }
  }

  document.querySelectorAll('.product').forEach(product => {
      const minusBtn = product.querySelector('.minus');
      const plusBtn = product.querySelector('.plus');
      const quantitySpan = product.querySelector('.quantity');
      const addToCartBtn = product.querySelector('.add-to-cart');
      const messageDiv = product.querySelector('.message');
      const colorSelect = product.querySelector('.led-color');
      const productName = product.querySelector('h2').textContent;
      const productPrice = product.querySelector('p').textContent;

      let quantity = parseInt(quantitySpan.textContent) || 1;
      let selectedColor = '';

      if (colorSelect) {
          selectedColor = colorSelect.value;
          colorSelect.addEventListener('change', (e) => {
              selectedColor = e.target.value;
          });
      }

      plusBtn.addEventListener('click', () => {
          quantity++;
          quantitySpan.textContent = quantity;
      });

      minusBtn.addEventListener('click', () => {
          if (quantity > 1) {
              quantity--;
              quantitySpan.textContent = quantity;
          }
      });

      addToCartBtn.addEventListener('click', () => {
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user || !user.loggedIn) {
              alert('Please login first to add items to cart');
              window.location.href = 'login.html';
              return;
          }

          const cart = getUserCart();
          const priceValue = parseFloat(productPrice.replace(/[^\d.]/g, ''));

          const productData = {
              id: `${productName}-${Date.now()}`, // إضافة معرف فريد
              name: selectedColor ? `${productName} - ${selectedColor}` : productName,
              price: priceValue,
              quantity: quantity,
              priceText: productPrice,
              color: selectedColor || null,
              addedAt: new Date().toISOString()
          };

          const existingIndex = cart.findIndex(item => 
              item.name === productData.name && 
              (!item.color || item.color === productData.color)
          );

          if (existingIndex > -1) {
              cart[existingIndex].quantity += quantity;
          } else {
              cart.push(productData);
          }

          saveUserCart(cart);

          messageDiv.textContent = `Added ${quantity} ${productData.name} to cart.`;
          messageDiv.style.display = 'block';

          setTimeout(() => {
              messageDiv.style.display = 'none';
          }, 3000);
      });
  });

  const cartIcon = document.querySelector('.cart-icon');
  window.addEventListener('scroll', () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollBottom >= documentHeight - 100) {
          cartIcon.classList.add('show');
      } else {
          cartIcon.classList.remove('show');
      }
  });

  function updateCartCount() {
      const cartCount = document.querySelector('.cart-count');
      if (cartCount) {
          const cart = getUserCart();
          const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
          cartCount.textContent = totalItems > 0 ? totalItems : '';
      }
  }

  updateCartCount();
  window.addEventListener('storage', updateCartCount);
});