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

// Enhanced Smooth Scroll with Transitions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        // Add exit animation to current section
        const currentSection = document.querySelector('section.visible');
        if (currentSection) {
            currentSection.classList.add('fade-exit');
            currentSection.classList.remove('visible');
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });

            // Add entrance animation
            setTimeout(() => {
                targetElement.classList.add('fade-enter');
                targetElement.classList.add('visible');

                // Remove transition classes after animation
                setTimeout(() => {
                    if (currentSection) {
                        currentSection.classList.remove('fade-exit');
                    }
                    targetElement.classList.remove('fade-enter');
                }, 500);
            }, 300);
        }
    });
});

// Enhanced Intersection Observer for Sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add fade-in animation
            entry.target.classList.add('fade-enter');
            entry.target.classList.add('visible');

            // Remove entrance animation class after transition
            setTimeout(() => {
                entry.target.classList.remove('fade-enter');
            }, 500);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for initial load animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Enhanced animations for specific elements
const animateElement = (element, delay = 0) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    element.style.transitionDelay = `${delay}s`;

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, delay * 1000);
};

// Animate hero section elements with sequence
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');
if (heroContent) animateElement(heroContent, 0.2);
if (heroImage) animateElement(heroImage, 0.4);

// Animate service cards with sequence
document.querySelectorAll('.service-card').forEach((card, index) => {
    animateElement(card, 0.2 + (index * 0.1));
});

// Animate testimonial cards with sequence
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    animateElement(card, 0.2 + (index * 0.2));
});

// Animate portfolio cards with sequence
document.querySelectorAll('.portfolio-card').forEach((card, index) => {
    animateElement(card, 0.2 + (index * 0.1));
});

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