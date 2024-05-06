document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 200
    });

    // Mobile menu interactions
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const scrollTopBtn = document.querySelector('.scroll-top');

    // Typewriter effect setup
    const roles = ['Eternal Student', 'Tech Tinkerer', 'Empirical Learner'];
    const elem = document.getElementById('dynamic-text');
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
        if (count === roles.length) {
            count = 0;
        }
        currentText = roles[count];
        letter = currentText.slice(0, ++index);

        elem.textContent = letter;
        if (letter.length === currentText.length) {
            setTimeout(erase, 2000);
        } else {
            setTimeout(type, 120);
        }
    }

    function erase() {
        letter = currentText.slice(0, --index);
        elem.textContent = letter;
        if (letter.length === 0) {
            count++;
            index = 0;
            setTimeout(type, 500);
        } else {
            setTimeout(erase, 60);
        }
    }

    type(); // Start the typewriter effect

    // Mobile menu toggle functionality
    burger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Scroll-to-top button functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for in-page links
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
