document.addEventListener('DOMContentLoaded', function() {
    let burger = document.querySelector('.burger-menu');
    let mobileMenu = document.querySelector('.mobile-menu');
    let overlay = document.querySelector('.overlay');
    let html = document.querySelector('html');
    let navLinks = document.querySelectorAll('.mobile-nav__link');

    function toggleMenu() {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        overlay.classList.toggle('active');
        html.classList.toggle('no-scroll');
    }

    function closeMenu() {
        burger.classList.remove('active');
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        html.classList.remove('no-scroll');
    }

    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    navLinks.forEach( link => {
        link.addEventListener('click', closeMenu);
    });
});
