// DOM Elements
const body = document.body;
const navLogin = document.getElementById('navLinkLogin');
const navSignup = document.getElementById('navLinkSignup');
const siteNav = document.querySelector('nav');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const toggleBtn = document.getElementById('mode-toggle');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    updateNavbar();
});

// ========== THEME FUNCTIONS ========== //
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

// ========== NAVBAR FUNCTIONS ========== //
function updateNavbar() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = user && user.loggedIn;

    if (isLoggedIn) {
        handleLoggedInState();
    } else {
        handleLoggedOutState();
    }
}

function handleLoggedInState() {
    if (navLogin)  navLogin.remove();
    if (navSignup) navSignup.remove();
    if (!document.getElementById('logoutLink')) {
        createLogoutLink();
    }
}

function handleLoggedOutState() {
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) logoutLink.remove();
}

function createLogoutLink() {
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.id = 'logoutLink';
    logoutLink.textContent = 'Logout';
    logoutLink.addEventListener('click', handleLogout);
    
    const cartLink = document.querySelector('a[href="cart.html"]');
    siteNav.insertBefore(logoutLink, cartLink);
}

// ========== AUTHENTICATION FUNCTIONS ========== //
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignup();
    });
}

function handleLogin() {
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    
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
}

function handleSignup() {
    const firstName = signupForm['First name'].value;
    const lastName = signupForm['Last name'].value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    
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
}

function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('user');
        updateNavbar();
        window.location.href = 'index.html';
    }
}