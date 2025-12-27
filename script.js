// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const desktopIcon = themeToggle.querySelector('i');
    const mobileIcon = mobileThemeToggle.querySelector('i');
    
    if (theme === 'dark') {
        desktopIcon.className = 'fas fa-sun';
        mobileIcon.className = 'fas fa-sun';
    } else {
        desktopIcon.className = 'fas fa-moon';
        mobileIcon.className = 'fas fa-moon';
    }
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Navbar Background on Scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        // Use CSS variables that respect the current theme
        navbar.style.background = 'var(--bg-card)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        navbar.style.background = 'var(--bg-card)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarBackground();
    animateOnScroll();
});

// Fade-in Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add fade-in class to elements
function addFadeInClasses() {
    const elementsToAnimate = [
        '.skill-item',
        '.project-card',
        '.timeline-item',
        '.certificate-item',
        '.stat'
    ];

    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
        });
    });
}

// Contact Form Handling
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4ECDC4' : type === 'error' ? '#FF6B6B' : '#45B7D1'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Advanced Typing Animation for Hero Section
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const subtitleElement = document.getElementById('subtitle');

    if (!typingElement) return;

    const roles = [
        'Safal Tiwari',
        'IoT Developer',
        'Tech Enthusiast',
        'Video Editor',
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isFirstTime = true;

    function typeAnimation() {
        const currentRole = roles[currentRoleIndex];

        if (!isDeleting) {
            // Typing
            typingElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            if (currentCharIndex === currentRole.length) {
                // Finished typing current role
                if (isFirstTime && currentRoleIndex === 0) {
                    // After typing "Safal Tiwari" for the first time
                    isFirstTime = false;
                    setTimeout(() => {
                        isDeleting = true;
                        setTimeout(typeAnimation, 1000); // Pause before deleting
                    }, 1000); // Show "Safal Tiwari" for 2 seconds
                    return;
                } else {
                    // Pause before deleting other roles
                    setTimeout(() => {
                        isDeleting = true;
                        setTimeout(typeAnimation, 500);
                    }, 1000);
                    return;
                }
            }
        } else {
            // Deleting
            typingElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;

            if (currentCharIndex === 0) {
                // Finished deleting
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;

                // Skip "Safal Tiwari" after first time
                if (currentRoleIndex === 0 && !isFirstTime) {
                    currentRoleIndex = 1;
                }

                setTimeout(typeAnimation, 500); // Pause before typing next role
                return;
            }
        }

        // Add cursor effect
        typingElement.classList.add('typing-cursor');

        // Continue animation
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeAnimation, speed);
    }

    // Start the animation
    setTimeout(typeAnimation, 1000);
}

// Skills Progress Animation
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');

    counters.forEach(counter => {
        const target = counter.innerText;
        const isNumber = !isNaN(target);

        if (isNumber) {
            const increment = target / 200;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                counter.innerText = Math.ceil(current);

                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                }
            }, 10);
        }
    });
}

// Parallax Effect for Hero Section
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Lazy Loading for Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Cursor Trail Effect (Optional)
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;

    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }

    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Masonry Layout for Video Editing Projects
function initMasonryLayout() {
    const videoProjectsGrid = document.querySelector('.projects-subsection:last-child .projects-grid');
    if (!videoProjectsGrid) return;

    function resizeGridItem(item) {
        const grid = videoProjectsGrid;
        const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
        const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));

        // Get the total height of the card including video and content
        const itemHeight = item.getBoundingClientRect().height;
        const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));

        item.style.gridRowEnd = `span ${rowSpan}`;
    }

    function resizeAllGridItems() {
        // Don't apply masonry on mobile devices
        if (window.innerWidth <= 480) {
            const allItems = videoProjectsGrid.querySelectorAll('.project-card');
            allItems.forEach(item => {
                item.style.gridRowEnd = 'auto';
            });
            return;
        }

        const allItems = videoProjectsGrid.querySelectorAll('.project-card');
        allItems.forEach(resizeGridItem);
    }

    // Wait for videos to load and then resize
    const videos = videoProjectsGrid.querySelectorAll('video');
    let loadedVideos = 0;

    function checkAllVideosLoaded() {
        loadedVideos++;
        if (loadedVideos === videos.length) {
            setTimeout(resizeAllGridItems, 100);
        }
    }

    videos.forEach(video => {
        if (video.readyState >= 2) {
            checkAllVideosLoaded();
        } else {
            video.addEventListener('loadedmetadata', checkAllVideosLoaded);
        }
    });

    // Fallback: resize after a delay even if videos don't load
    setTimeout(resizeAllGridItems, 1000);

    // Resize on window resize
    window.addEventListener('resize', () => {
        setTimeout(resizeAllGridItems, 100);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    addFadeInClasses();
    animateOnScroll();

    // Initialize typing animation
    initTypingAnimation();

    // Initialize masonry layout for video projects
    initMasonryLayout();

    // Initialize other animations
    setTimeout(() => {
        animateSkillBars();
        animateCounters();
    }, 2000);

    // Optional: Enable cursor trail (uncomment if desired)
    // createCursorTrail();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preloader (if you want to add one)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Uncomment to enable preloader
// showPreloader();

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for potential use in other scripts
window.portfolioUtils = {
    showNotification,
    toggleTheme,
    typeWriter,
    animateCounters
};