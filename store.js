document.querySelectorAll('.section-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 
      document.body.classList.add('fade-out');
        setTimeout(() => {
        window.location.href = this.href;
      }, 500);
    });
  });


  const toggleBtn = document.getElementById('mode-toggle');
  const body = document.body;
  
  function updateButtonText() {
      const currentTheme = body.getAttribute('data-theme');
      toggleBtn.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
  }
  
  toggleBtn.addEventListener('click', () => {
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', newTheme);
      localStorage.setItem('mode', newTheme);
      updateButtonText();
  });
  
  window.addEventListener('load', () => {
      const savedMode = localStorage.getItem('mode') || 'dark';
      body.setAttribute('data-theme', savedMode);
      updateButtonText();
  });
  
  

  

  
  