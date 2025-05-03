
const body = document.body;
const navLogin = document.getElementById('navLinkLogin');
const navSignup = document.getElementById('navLinkSignup');
const siteNav = document.querySelector('nav');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleBtn = document.getElementById('mode-toggle');

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    updateNavbar();
});

function initTheme() {
    const savedMode = localStorage.getItem('mode') || 'dark';
    body.setAttribute('data-theme', savedMode);
    updateButtonText();
}

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

function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = user && user.loggedIn;

    if (isLoggedIn) {
        if (navLogin) navLogin.style.display = 'none';
        if (navSignup) navSignup.style.display = 'none';
        
        if (!document.getElementById('logoutLink')) {
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.id = 'logoutLink';
            logoutLink.textContent = 'Logout';
            logoutLink.addEventListener('click', handleLogout);
            
            const cartLink = document.querySelector('a[href="cart.html"]');
            siteNav.insertBefore(logoutLink, cartLink.nextSibling);
        }
    } else {
        const logoutLink = document.getElementById('logoutLink');
        if (logoutLink) logoutLink.remove();
        
        if (navLogin) navLogin.style.display = 'block';
        if (navSignup) navSignup.style.display = 'block';
    }
}
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = this.username.value.trim();
        const password = this.password.value.trim();
        
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        localStorage.setItem('user', JSON.stringify({
            username: username,
            loggedIn: true
        }));
        
        updateNavbar();    
        window.location.href = 'index.html';
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = this['First name'].value.trim();
        const lastName = this['Last name'].value.trim();
        const email = this.email.value.trim();
        const password = this.password.value.trim();
        
        if (!firstName || !lastName || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        localStorage.setItem('user', JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: email.split('@')[0],
            loggedIn: true
        }));
        
        updateNavbar();  
        window.location.href = 'index.html';
    });
}

function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');  
        updateNavbar();
        window.location.href = 'index.html';
    }
}