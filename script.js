// script.js - Logic login Google dan landing page

// Fungsi callback Google Identity Services
function handleCredentialResponse(response) {
    // Mendecode JWT untuk mendapatkan nama user
    const data = parseJwt(response.credential);
    if (data && data.name) {
        // Simpan nama user ke localStorage
        localStorage.setItem('google_user_name', data.name);
        // Redirect ke landing page
        window.location.href = 'landing.html';
    }
}

// Fungsi untuk mendecode JWT (JSON Web Token)
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

// Logic untuk landing page
if (window.location.pathname.endsWith('landing.html')) {
    // Ambil nama user dari localStorage
    const userName = localStorage.getItem('google_user_name');
    const welcome = document.getElementById('welcome-message');
    if (userName && welcome) {
        welcome.textContent = `Selamat Datang, ${userName}`;
    } else if (welcome) {
        // Jika tidak ada nama user, redirect ke login
        window.location.href = 'index.html';
    }
    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('google_user_name');
            window.location.href = 'index.html';
        });
    }
}

// Jika sudah login, redirect ke landing page dari index.html
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('index.html')) {
        const userName = localStorage.getItem('google_user_name');
        if (userName) {
            window.location.href = 'landing.html';
        }
    }
});

// Catatan: Ganti YOUR_GOOGLE_CLIENT_ID di index.html dengan client ID asli dari Google Cloud Console.
