/**
 * SaltEgypt - Main JavaScript
 * Handles interactive elements and responsive navigation
 */

/**
 * SaltEgypt - Enhanced JavaScript
 * Handles interactive elements, responsive navigation, animations, and enhanced user experience
 * Updated: May 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Toggle between hamburger and X icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll with animation
    const header = document.querySelector('header');
    const backToTopBtn = createBackToTopButton();
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Hide/show header on scroll direction with smoother animation
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down - hide header with smooth transition
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header with smooth transition
            header.style.transform = 'translateY(0)';
        }
        
        // Show/hide back to top button
        if (scrollTop > 600) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Add scroll animation to elements
        animateOnScroll();
        
        lastScrollTop = scrollTop;
    });
    
    // Initialize AOS animation library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
    
    // Testimonial slider if exists
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial');
        const dotsContainer = document.querySelector('.dots-container');
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToTestimonial(index);
            });
        });
        
        function goToTestimonial(index) {
            testimonials[currentTestimonial].classList.remove('active');
            document.querySelector(`.dot[data-index="${currentTestimonial}"]`).classList.remove('active');
            
            currentTestimonial = index;
            
            testimonials[currentTestimonial].classList.add('active');
            document.querySelector(`.dot[data-index="${currentTestimonial}"]`).classList.add('active');
        }
        
        // Auto advance testimonials
        setInterval(() => {
            let nextIndex = currentTestimonial + 1;
            if (nextIndex >= testimonials.length) {
                nextIndex = 0;
            }
            goToTestimonial(nextIndex);
        }, 5000);
    }
    
    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            let isValid = true;
            
            if (name.trim() === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else {
                removeError('name');
            }
            
            if (email.trim() === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError('email');
            }
            
            if (message.trim() === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else {
                removeError('message');
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For now, just show a success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll contact you shortly.</p>
                    </div>
                `;
            }
        });
        
        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            let errorElement = field.nextElementSibling;
            
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.classList.add('error-message');
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            }
            
            errorElement.textContent = message;
            field.classList.add('error');
        }
        
        function removeError(fieldId) {
            const field = document.getElementById(fieldId);
            const errorElement = field.nextElementSibling;
            
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.remove();
            }
            
            field.classList.remove('error');
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // Product filter in the products page if exists
    const productFilters = document.querySelectorAll('.product-filter button');
    if (productFilters.length > 0) {
        productFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                productFilters.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked filter
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                const products = document.querySelectorAll('.product-item');
                
                products.forEach(product => {
                    if (filterValue === 'all') {
                        product.style.display = 'block';
                    } else if (product.classList.contains(filterValue)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });
    }
    
    /**
     * Create back to top button
     */
    function createBackToTopButton() {
        const backToTop = document.createElement('div');
        backToTop.classList.add('back-to-top');
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return backToTop;
    }
    
    /**
     * Animate elements on scroll
     */
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-item, .product-card, .team-member, .certificate-item, .blog-post');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    /**
     * Add animation classes to elements
     */
    function initAnimations() {
        // Add animation delay to feature items
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.style.animationDelay = `${0.2 * index}s`;
        });
        
        // Add animation delay to product cards
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.animationDelay = `${0.2 * index}s`;
        });
    }
    
    // Initialize animations
    initAnimations();
    
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});
