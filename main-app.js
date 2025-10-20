// Main Portfolio Application - Unified Script
class PortfolioApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.sounds = {};
        this.audioContext = null;
        
        // Ensure content is visible immediately
        this.ensureContentVisible();
        
        // Wait for all dependencies to load
        this.waitForDependencies().then(() => {
            this.init();
        });
    }

    async waitForDependencies() {
        const checkDependencies = () => {
            return new Promise((resolve) => {
                const check = () => {
                    if (typeof THREE !== 'undefined' && 
                        typeof gsap !== 'undefined' && 
                        typeof AOS !== 'undefined') {
                        resolve();
                    } else {
                        setTimeout(check, 100);
                    }
                };
                check();
            });
        };
        
        await checkDependencies();
        console.log('✅ All dependencies loaded');
    }

    init() {
        if (this.isInitialized) return;
        
        try {
            // Initialize in correct order
            this.initBasicFeatures();
            this.initGSAP();
            this.initAOS();
            this.initThreeJS();
            this.initSounds();
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('🚀 Portfolio initialized successfully');
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    }

    initBasicFeatures() {
        // Navigation
        this.setupNavigation();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Contact form
        this.setupContactForm();
        
        // Counters and skill bars
        this.setupCounters();
        this.setupSkillBars();
        
        // Custom cursor (simplified)
        this.setupCustomCursor();
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        // Navbar scroll effect
        let ticking = false;
        const updateNavbar = () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });

        // Mobile menu toggle
        if (hamburger && navMenu) {
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
        }
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                if (!name || !email || !message) {
                    this.showNotification('Por favor, completa todos los campos.', 'error');
                    return;
                }
                
                if (!this.isValidEmail(email)) {
                    this.showNotification('Por favor, ingresa un email válido.', 'error');
                    return;
                }
                
                this.showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                contactForm.reset();
                
                // Trigger celebration if GSAP is available
                if (this.components.gsap) {
                    this.celebrate();
                }
            });
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
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
        `;
        
        document.body.appendChild(notification);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        let hasAnimated = false;

        const animateCounters = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            counters.forEach((counter, index) => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                let startTime = null;
                
                setTimeout(() => {
                    const updateCounter = (timestamp) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * target);
                        
                        counter.textContent = current;
                        
                        if (progress >= 1) {
                            counter.textContent = target;
                        } else {
                            requestAnimationFrame(updateCounter);
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                }, index * 200);
            });
        };

        // Trigger when about section is visible
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateCounters, 500);
                        observer.unobserve(aboutSection);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(aboutSection);
        }
    }

    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        let hasAnimated = false;

        const animateSkillBars = () => {
            if (hasAnimated) return;
            hasAnimated = true;

            skillBars.forEach((bar, index) => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, index * 100);
            });
        };

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(animateSkillBars, 800);
                        observer.unobserve(skillsSection);
                    }
                });
            }, { threshold: 0.3 });
            
            observer.observe(skillsSection);
        }
    }

    setupCustomCursor() {
        const cursor = document.createElement('div');
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
        
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
            cursor.style.opacity = '0.8';
        });
        
        // Enhanced hover effects
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category, .floating-element');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, #00d2ff 0%, #ff6b6b 100%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, #667eea 0%, #00d2ff 100%)';
            });
        });
    }

    initGSAP() {
        if (typeof gsap === 'undefined') {
            // If GSAP is not available, ensure content is visible
            this.ensureContentVisible();
            return;
        }
        
        try {
            gsap.registerPlugin(ScrollTrigger);
            
            // Ensure content is visible first, then animate
            gsap.set('.hero-text', { opacity: 1, y: 0 });
            gsap.set('.hero-image', { opacity: 1, scale: 1 });
            gsap.set('.floating-element', { opacity: 1, scale: 1 });
            
            // Hero entrance animation with delay to ensure visibility
            setTimeout(() => {
                const tl = gsap.timeline();
                tl.from('.hero-text', { 
                    duration: 1.2, 
                    y: 50, 
                    opacity: 0, 
                    ease: "power3.out" 
                })
                .from('.hero-image', { 
                    duration: 1, 
                    scale: 0.9, 
                    opacity: 0, 
                    ease: "back.out(1.7)" 
                }, "-=0.8")
                .from('.floating-element', { 
                    duration: 0.8, 
                    scale: 0.8, 
                    opacity: 0,
                    stagger: 0.1,
                    ease: "elastic.out(1, 0.5)" 
                }, "-=0.5");
            }, 500);

            // Scroll animations
            gsap.utils.toArray('.skill-category').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 0.8,
                    y: 50,
                    opacity: 0,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            });

            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    duration: 1,
                    y: 80,
                    opacity: 0,
                    delay: index * 0.2,
                    ease: "power3.out"
                });
            });

            this.components.gsap = true;
            console.log('✅ GSAP initialized');
        } catch (error) {
            console.error('❌ GSAP initialization error:', error);
            this.ensureContentVisible();
        }
    }

    ensureContentVisible() {
        // Fallback to ensure content is always visible
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        if (heroText) {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }
        
        if (heroImage) {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }
        
        floatingElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        });
        
        console.log('✅ Content visibility ensured');
    }

    initAOS() {
        if (typeof AOS === 'undefined') return;
        
        try {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100
            });
            
            this.components.aos = true;
            console.log('✅ AOS initialized');
        } catch (error) {
            console.error('❌ AOS initialization error:', error);
        }
    }

    initThreeJS() {
        if (typeof THREE === 'undefined') return;
        
        try {
            this.components.three = new ThreeBackground();
            console.log('✅ Three.js initialized');
        } catch (error) {
            console.error('❌ Three.js initialization error:', error);
        }
    }

    initSounds() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSoundEffect('hover', 800, 0.1);
            this.createSoundEffect('click', 1200, 0.15);
            
            this.components.sounds = true;
            console.log('✅ Sounds initialized');
        } catch (error) {
            console.error('❌ Sounds initialization error:', error);
        }
    }

    createSoundEffect(name, frequency, duration) {
        this.sounds[name] = () => {
            if (!this.audioContext || this.audioContext.state === 'suspended') return;
            
            try {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + duration);
            } catch (error) {
                console.warn('Sound effect error:', error);
            }
        };
    }

    setupEventListeners() {
        // Hover sound effects
        document.querySelectorAll('.skill-category, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (this.sounds.hover) this.sounds.hover();
            });
            
            el.addEventListener('click', () => {
                if (this.sounds.click) this.sounds.click();
            });
        });

        // Floating elements click
        document.querySelectorAll('.floating-element').forEach(element => {
            element.addEventListener('click', () => {
                if (this.sounds.click) this.sounds.click();
                
                if (this.components.gsap && typeof gsap !== 'undefined') {
                    gsap.to(element, {
                        duration: 0.6,
                        scale: 1.3,
                        rotation: "+=360",
                        ease: "elastic.out(1, 0.3)",
                        yoyo: true,
                        repeat: 1
                    });
                }
            });
        });
    }

    celebrate() {
        if (!this.components.gsap || typeof gsap === 'undefined') return;
        
        const colors = ['#667eea', '#00d2ff', '#764ba2', '#ff6b6b'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 10000;
                pointer-events: none;
                border-radius: 2px;
            `;
            
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                duration: Math.random() * 3 + 2,
                y: window.innerHeight + 100,
                rotation: Math.random() * 360,
                ease: "power2.in",
                onComplete: () => confetti.remove()
            });
        }
    }
}

// Simplified Three.js Background
class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        
        try {
            this.init();
            this.createParticles();
            this.animate();
        } catch (error) {
            console.error('Three.js error:', error);
        }
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            this.renderer.domElement.style.position = 'absolute';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '1';
            this.renderer.domElement.style.pointerEvents = 'none';
            heroSection.appendChild(this.renderer.domElement);
        }

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    createParticles() {
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 10;
            positions[i3 + 1] = (Math.random() - 0.5) * 10;
            positions[i3 + 2] = (Math.random() - 0.5) * 10;

            const color = new THREE.Color();
            color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Immediate content visibility fix
function ensureImmediateVisibility() {
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    if (heroText) {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
        heroText.style.visibility = 'visible';
    }
    
    if (heroImage) {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'scale(1)';
        heroImage.style.visibility = 'visible';
    }
    
    floatingElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'scale(1)';
        el.style.visibility = 'visible';
    });
}

// Run immediately when script loads
ensureImmediateVisibility();

// Run again when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ensureImmediateVisibility();
        setTimeout(() => {
            window.portfolioApp = new PortfolioApp();
        }, 100);
    });
} else {
    ensureImmediateVisibility();
    setTimeout(() => {
        window.portfolioApp = new PortfolioApp();
    }, 100);
}

// Fallback check every 500ms for the first 3 seconds
let visibilityCheckCount = 0;
const visibilityInterval = setInterval(() => {
    visibilityCheckCount++;
    ensureImmediateVisibility();
    
    if (visibilityCheckCount >= 6) {
        clearInterval(visibilityInterval);
    }
}, 500);

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
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
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
    }
`;
document.head.appendChild(notificationStyles);
