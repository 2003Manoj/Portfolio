// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navItems = document.querySelector('.nav-items');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');

// Theme Toggle
const theme = localStorage.getItem('theme') || 'light';
document.body.classList.add(theme);

themeToggle.addEventListener('click', () => {
    handleThemeTransition();
    document.body.classList.toggle('dark');
    const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
});

// Mobile Menu
mobileMenuBtn.addEventListener('click', () => {
    navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-items a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navItems.style.display = 'none';
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navItems.style.display = 'flex';
    } else {
        navItems.style.display = 'none';
    }
});

// Contact Form
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    try {
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', data);

        // Show success message
        alert('Thank you for your message. I\'ll get back to you soon!');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Something went wrong. Please try again later.');
    }
});

// Update copyright year
currentYear.textContent = new Date().getFullYear();

// Smooth Scroll with Active State
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 60, // Adjust for fixed header
                behavior: 'smooth'
            });

            // Update active state
            updateActiveState(targetId);
        }
    });
});

// Intersection Observer for Sections
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Update active state in navigation
            const id = entry.target.getAttribute('id');
            updateActiveState('#' + id);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Function to update active state
function updateActiveState(targetId) {
    document.querySelectorAll('.nav-items a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === targetId);
    });
}

// Add smooth transition for theme toggle
const handleThemeTransition = () => {
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
        element.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
    });
};

// Initial theme transition setup
handleThemeTransition();

// Ensure all sections are visible
function showAllSections() {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'block';
    });
}

// Call this function when the page loads and after any navigation
window.addEventListener('load', showAllSections);
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', showAllSections);
});

// Add scroll event listener to keep all sections visible
window.addEventListener('scroll', showAllSections);