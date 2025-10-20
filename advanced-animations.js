// Advanced GSAP Animations and Sound Effects
class AdvancedAnimations {
    constructor() {
        this.sounds = {};
        this.initGSAP();
        this.initSounds();
        this.setupScrollAnimations();
        this.setup3DHoverEffects();
        this.setupLazyLoading();
    }

    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero entrance animation
        const tl = gsap.timeline();
        tl.from('.hero-text', { 
            duration: 1.2, 
            y: 100, 
            opacity: 0, 
            ease: "power3.out" 
        })
        .from('.hero-image', { 
            duration: 1, 
            scale: 0.8, 
            opacity: 0, 
            ease: "back.out(1.7)" 
        }, "-=0.5")
        .from('.floating-element', { 
            duration: 0.8, 
            scale: 0, 
            rotation: 360, 
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)" 
        }, "-=0.3");
    }

    initSounds() {
        // Create audio context for Web Audio API
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create simple sound effects using oscillators
        this.createSoundEffect('hover', 800, 0.1);
        this.createSoundEffect('click', 1200, 0.15);
        this.createSoundEffect('whoosh', 400, 0.2);
    }

    createSoundEffect(name, frequency, duration) {
        this.sounds[name] = () => {
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, this.audioContext.currentTime + duration);
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        };
    }

    setupScrollAnimations() {
        // Skill cards animation
        gsap.utils.toArray('.skill-category').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                rotationX: 15,
                delay: index * 0.1,
                ease: "power2.out"
            });
        });

        // Project cards with 3D effect
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
                rotationY: 25,
                delay: index * 0.2,
                ease: "power3.out"
            });
        });

        // Text reveal animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                },
                duration: 1,
                y: 30,
                opacity: 0,
                ease: "power2.out"
            });
        });
    }

    setup3DHoverEffects() {
        // Enhanced 3D hover for skill categories
        document.querySelectorAll('.skill-category').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.sounds.hover();
                gsap.to(card, {
                    duration: 0.3,
                    rotationX: -10,
                    rotationY: 10,
                    z: 50,
                    ease: "power2.out"
                });
                
                // Add glow effect
                gsap.to(card, {
                    duration: 0.3,
                    boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)",
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.3,
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                    ease: "power2.out"
                });
            });

            card.addEventListener('click', () => {
                this.sounds.click();
                gsap.to(card, {
                    duration: 0.1,
                    scale: 0.95,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
            });
        });

        // 3D hover for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.sounds.whoosh();
                gsap.to(card, {
                    duration: 0.4,
                    rotationX: 5,
                    rotationY: -5,
                    z: 30,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    duration: 0.4,
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    ease: "power2.out"
                });
            });
        });

        // Floating elements interaction
        document.querySelectorAll('.floating-element').forEach(element => {
            element.addEventListener('click', (e) => {
                this.sounds.click();
                
                // Create explosion effect in Three.js
                if (window.threeBackground) {
                    const rect = element.getBoundingClientRect();
                    const x = (rect.left + rect.width / 2 - window.innerWidth / 2) / window.innerWidth * 2;
                    const y = -(rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight * 2;
                    window.threeBackground.createExplosion(x, y);
                }
                
                // GSAP animation
                gsap.to(element, {
                    duration: 0.6,
                    scale: 1.5,
                    rotation: "+=360",
                    ease: "elastic.out(1, 0.3)",
                    yoyo: true,
                    repeat: 1
                });
            });
        });
    }

    setupLazyLoading() {
        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Performance optimization: reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            gsap.globalTimeline.timeScale(0.5);
        }
    }

    // Method to trigger celebration animation
    celebrate() {
        const colors = ['#667eea', '#00d2ff', '#764ba2', '#ff6b6b'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 10000;
                pointer-events: none;
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
        
        this.sounds.whoosh();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize advanced animations
    window.advancedAnimations = new AdvancedAnimations();
    
    // Add celebration on form submit
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.advancedAnimations.celebrate();
            // Handle form submission here
        });
    }
});

// Export for global access
window.AdvancedAnimations = AdvancedAnimations;
