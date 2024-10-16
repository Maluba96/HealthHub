(function() {
    'use strict';

    var elToggle = document.querySelector('.js-password-show-toggle'),
        passwordInput = document.getElementById('password');

    elToggle.addEventListener('click', (e) => {
        e.preventDefault();
        if (elToggle.classList.contains('active')) {
            passwordInput.setAttribute('type', 'password');
            elToggle.classList.remove('active');
        } else {
            passwordInput.setAttribute('type', 'text');
            elToggle.classList.add('active');
        }
    });

    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }
})();
