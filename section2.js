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
      }
  }

  document.querySelectorAll('.quantity-control').forEach(control => {
      const minusBtn = control.querySelector('.minus');
      const plusBtn = control.querySelector('.plus');
      const quantityDisplay = control.querySelector('.quantity');
      
      minusBtn.addEventListener('click', () => {
          let current = parseInt(quantityDisplay.textContent);
          if (current > 1) {
              quantityDisplay.textContent = current - 1;
          }
      });
      
      plusBtn.addEventListener('click', () => {
          let current = parseInt(quantityDisplay.textContent);
          quantityDisplay.textContent = current + 1;
      });
  });

  document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', function() {
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user || !user.loggedIn) {
              alert('Please login first to add items to cart');
              window.location.href = 'login.html';
              return;
          }

          const product = this.closest('.product');
          const productName = product.querySelector('h2').textContent;
          const productModel = product.querySelector('h3') ? product.querySelector('h3').textContent : '';
          const priceText = product.querySelector('p').textContent;
          const price = parseFloat(priceText.replace('Price:', '').replace('L.E', '').trim());
          const quantity = parseInt(product.querySelector('.quantity').textContent);
          
          let cart = getUserCart();
          
          const productId = `${productName}-${productModel}`.replace(/\s+/g, '-');
          
          const existingItem = cart.find(item => item.id === productId);
          if (existingItem) {
              existingItem.quantity += quantity;
          } else {
              cart.push({
                  id: productId,
                  name: productName,
                  description: productModel,
                  price: price,
                  quantity: quantity,
                  addedAt: new Date().toISOString() 
              });
          }
          
          saveUserCart(cart);
          
          const messageDiv = product.querySelector('.message');
          messageDiv.textContent = `${quantity} ${productName} added to cart!`;
          messageDiv.classList.add('show');
          
          setTimeout(() => {
              messageDiv.classList.remove('show');
          }, 2000);
      });
  });
});