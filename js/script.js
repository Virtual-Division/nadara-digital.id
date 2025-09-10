// Modern Interactive Features for Nadara Digital Solusi Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme first
    initThemeToggle();
    
    // Initialize all features
    initMobileNavigation();
    initSmoothScrolling();
    initNavbarEffects();
    initContactForm();
    initScrollAnimations();
    initCounterAnimations();
    initLazyLoading();
    initBackToTop();
    initParticleEffect();
    initTypingEffect();
    initGlowEffects();
    
    // Performance optimizations
    debounceScrollEvents();
    preloadCriticalResources();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const lightIcon = document.getElementById('lightIcon');
    const darkIcon = document.getElementById('darkIcon');
    const body = document.body;
    const root = document.documentElement;
    
    // Check for saved theme preference or default to device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = root.classList.contains('light-mode') ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    function setTheme(theme) {
        if (theme === 'light') {
            root.classList.add('light-mode');
            updateThemeIcons('light');
        } else {
            root.classList.remove('light-mode');
            updateThemeIcons('dark');
        }
        
        // Update meta theme-color for mobile browsers
        updateMetaThemeColor(theme);
    }
    
    function updateThemeIcons(theme) {
        if (lightIcon && darkIcon) {
            if (theme === 'light') {
                lightIcon.classList.add('active');
                darkIcon.classList.remove('active');
            } else {
                lightIcon.classList.remove('active');
                darkIcon.classList.add('active');
            }
        }
    }
    
    function updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        metaThemeColor.content = theme === 'light' ? '#ffffff' : '#0a0a0a';
    }
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Navbar Scroll Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active section in navigation
        updateActiveSection();
    }
    
    window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
}

// Update Active Section Based on Scroll Position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                showFormLoading(true);
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showFormLoading(false);
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

// Form Validation
function validateForm(formData) {
    let isValid = true;
    const errors = [];
    
    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }
    
    // Message validation
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification(errors.join('\n'), 'error');
    }
    
    return isValid;
}

// Individual Field Validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'text':
            if (field.required && value.length < 2) {
                isValid = false;
                errorMessage = 'This field must be at least 2 characters long';
            }
            break;
        case 'textarea':
            if (field.required && value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

// Show Field Error
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

// Clear Field Error
function clearFieldError(field) {
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Show Form Loading State
function showFormLoading(isLoading) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    
    if (submitBtn) {
        if (isLoading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.style.opacity = '1';
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Manual close
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Trigger counter animation if it's a stat element
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('services-grid') || 
                    entry.target.classList.contains('portfolio-grid') ||
                    entry.target.classList.contains('testimonials-grid') ||
                    entry.target.classList.contains('blog-grid')) {
                    animateGridItems(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .hero-image,
        .section-header,
        .about-content,
        .service-card,
        .portfolio-item,
        .testimonial,
        .blog-post,
        .contact-content,
        .stat,
        .services-grid,
        .portfolio-grid,
        .testimonials-grid,
        .blog-grid
    `);
    
    animatedElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

// Animate Grid Items with Stagger Effect
function animateGridItems(gridContainer) {
    const items = gridContainer.children;
    
    Array.from(items).forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s both`;
        }, index * 100);
    });
}

// Counter Animations
function initCounterAnimations() {
    // This will be triggered by the intersection observer
}

function animateCounter(statElement) {
    const counterElement = statElement.querySelector('h3');
    if (!counterElement || counterElement.dataset.animated) return;
    
    // Define hardcoded final values for each stat type
    const statText = statElement.querySelector('p').textContent;
    let finalValue;
    
    if (statText.includes('Successful Projects')) {
        finalValue = '50+';
    } else if (statText.includes('System Uptime')) {
        finalValue = '99.9%';
    } else if (statText.includes('Support Available')) {
        finalValue = '24/7';
    } else if (statText.includes('Years Experience')) {
        finalValue = '5+';
    } else {
        finalValue = counterElement.textContent; // fallback
    }
    
    // Extract numeric part for animation
    const numericMatch = finalValue.match(/([0-9.]+)/);
    if (!numericMatch) {
        counterElement.textContent = finalValue;
        counterElement.dataset.animated = 'true';
        return;
    }
    
    const targetValue = parseFloat(numericMatch[1]);
    const prefix = finalValue.substring(0, numericMatch.index);
    const suffix = finalValue.substring(numericMatch.index + numericMatch[0].length);
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        let currentValue;
        
        if (finalValue.includes('.')) {
            // Handle decimal values (like 99.9%)
            currentValue = (targetValue * easeOutQuart).toFixed(1);
        } else {
            // Handle integer values
            currentValue = Math.floor(targetValue * easeOutQuart);
        }
        
        counterElement.textContent = prefix + currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counterElement.textContent = finalValue;
            counterElement.dataset.animated = 'true';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Back to Top Button
function initBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
    
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Particle Effect Background
function initParticleEffect() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 8000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Typing Effect for Hero Title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    const words = originalText.split(' ');
    let currentWordIndex = 0;
    
    // Only apply typing effect on larger screens
    if (window.innerWidth > 768) {
        heroTitle.textContent = '';
        
        function typeWord() {
            if (currentWordIndex < words.length) {
                heroTitle.textContent += (currentWordIndex > 0 ? ' ' : '') + words[currentWordIndex];
                currentWordIndex++;
                setTimeout(typeWord, 200);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWord, 500);
    }
}

// Glow Effects on Hover
function initGlowEffects() {
    const glowElements = document.querySelectorAll('.service-card, .portfolio-item, .btn, .social-link');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 20px rgba(104, 211, 145, 0.4))';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    });
}

// Performance Optimization: Debounce Scroll Events
function debounceScrollEvents() {
    let scrollTimer = null;
    
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(function() {
            // Trigger any scroll-dependent functions here
            updateScrollProgress();
        }, 10);
    });
}

// Update Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-green), var(--accent-cyan));
            z-index: 10001;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(104, 211, 145, 0.5);
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrollProgress + '%';
}

// Preload Critical Resources
function preloadCriticalResources() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    
    // Preload Font Awesome icons
    const iconLink = document.createElement('link');
    iconLink.rel = 'preload';
    iconLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    iconLink.as = 'style';
    document.head.appendChild(iconLink);
}

// Utility Functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Handle Window Resize
window.addEventListener('resize', debounce(function() {
    // Recalculate any size-dependent features
    updateScrollProgress();
}, 250));

// Handle Page Visibility Change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardNavCSS = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-green) !important;
        outline-offset: 2px !important;
    }
`;

const style = document.createElement('style');
style.textContent = keyboardNavCSS;
document.head.appendChild(style);

// Console welcome message
console.log('%c🚀 Nadara Digital Solusi', 'color: #68d391; font-size: 24px; font-weight: bold;');
console.log('%cWebsite loaded successfully! Modern, futuristic, and ready for digital transformation.', 'color: #4fd1c7; font-size: 14px;');