// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger specific animations based on section
            if (entry.target.id === 'about') {
                setTimeout(animateCounters, 500);
            }
            
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Add fade-in to cards
    const cards = document.querySelectorAll('.about-card, .stat-card, .skill-category, .project-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const roleElement = document.querySelector('.role');
    if (roleElement) {
        const originalText = roleElement.textContent;
        setTimeout(() => {
            typeWriter(roleElement, originalText, 80);
        }, 2000);
    }
});

// Contact form handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Por favor, completa todos los campos.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, ingresa un email válido.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
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
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preloader styles
const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'SR';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: 700;
        color: white;
        z-index: 10001;
        animation: pulse 1.5s ease-in-out infinite;
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: translate(-50%, -50%) scale(1);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
    }
    
    body.loaded::before,
    body.loaded::after {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
    }
`;
document.head.appendChild(preloaderStyles);

// Theme toggle functionality (optional enhancement)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #667eea;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeToggle.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', createThemeToggle);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Enhanced custom cursor with trail effect and particles
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    const cursorTrail = [];
    
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #667eea 0%, #00d2ff 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        opacity: 0;
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
    `;
    
    document.body.appendChild(cursor);
    
    // Create cursor trail
    for (let i = 0; i < 8; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${15 - i * 1.5}px;
            height: ${15 - i * 1.5}px;
            background: rgba(102, 126, 234, ${0.6 - i * 0.07});
            border-radius: 50%;
            pointer-events: none;
            z-index: ${9999 - i};
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
    }
    
    let mouseX = 0, mouseY = 0;
    let trailX = [], trailY = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
        cursor.style.opacity = '0.8';
        
        // Update trail positions
        trailX.unshift(mouseX);
        trailY.unshift(mouseY);
        
        if (trailX.length > 8) {
            trailX.pop();
            trailY.pop();
        }
        
        cursorTrail.forEach((trail, index) => {
            if (trailX[index] !== undefined) {
                const size = 15 - index * 1.5;
                trail.style.left = trailX[index] - size/2 + 'px';
                trail.style.top = trailY[index] - size/2 + 'px';
                trail.style.opacity = '0.6';
            }
        });
    });
    
    // Enhanced hover effects with particles
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .floating-element');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, #00d2ff 0%, #ff6b6b 100%)';
            cursor.style.boxShadow = '0 0 30px rgba(0, 210, 255, 0.8)';
            
            // Create particle burst on hover
            createHoverParticles(mouseX, mouseY);
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #667eea 0%, #00d2ff 100%)';
            cursor.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
        });
    });
});

// Create hover particles
function createHoverParticles(x, y) {
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: #00d2ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${x}px;
            top: ${y}px;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 6) * Math.PI * 2;
        const velocity = 30 + Math.random() * 20;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { 
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// Add floating particles background
function createFloatingParticles() {
    const particleCount = 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(102, 126, 234, 0.3);
        `;
        
        document.body.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 4 + 1
        });
    }
    
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > window.innerWidth) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
            }
            if (particle.y < 0 || particle.y > window.innerHeight) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
            }
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            
            // Add subtle pulsing
            const pulse = Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.5 + 0.5;
            particle.element.style.opacity = pulse * 0.6 + 0.2;
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// Enhanced typing animation with multiple effects
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = `
        animation: blink 1s infinite;
        color: #667eea;
        font-weight: 400;
    `;
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1);
            element.appendChild(cursor);
            i++;
            
            // Add typing sound effect simulation
            if (Math.random() > 0.7) {
                const soundEffect = document.createElement('div');
                soundEffect.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: #00d2ff;
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 20 - 10}px;
                    top: ${Math.random() * 20 - 10}px;
                `;
                element.style.position = 'relative';
                element.appendChild(soundEffect);
                
                setTimeout(() => soundEffect.remove(), 200);
            }
            
            setTimeout(type, speed + Math.random() * 50);
        } else {
            setTimeout(() => {
                if (cursor.parentNode) {
                    cursor.remove();
                }
            }, 2000);
        }
    }
    
    type();
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    
    // Enhanced loading sequence
    setTimeout(() => {
        const greetingElement = document.querySelector('.greeting');
        if (greetingElement) {
            const greetingText = greetingElement.textContent;
            typeWriter(greetingElement, greetingText, 60);
        }
    }, 1500);
    
    setTimeout(() => {
        const roleElement = document.querySelector('.role');
        if (roleElement) {
            const originalText = roleElement.textContent;
            typeWriter(roleElement, originalText, 80);
        }
    }, 4000);
});

// Add CSS animations
const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    @keyframes skillBarPulse {
        0%, 100% { box-shadow: 0 0 5px rgba(102, 126, 234, 0.5); }
        50% { box-shadow: 0 0 15px rgba(102, 126, 234, 0.8); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .skill-category {
        position: relative;
    }
    
    .project-card {
        perspective: 1000px;
    }
`;
document.head.appendChild(advancedStyles);

console.log('🚀 Portfolio loaded successfully!');
console.log('👨‍💻 Developed by Sandro Reátegui');
console.log('📧 Contact: zapayox30@gmail.com');
console.log('✨ Enhanced with advanced particle effects and animations!');
