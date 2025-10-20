// Three.js 3D Background with Particles
class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = [];
        this.geometries = [];
        this.mouse = { x: 0, y: 0 };
        this.windowHalf = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        
        this.init();
        this.createParticles();
        this.createFloatingGeometries();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.z = 5;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Add canvas to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            this.renderer.domElement.style.position = 'absolute';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.zIndex = '1';
            this.renderer.domElement.style.pointerEvents = 'none';
            heroSection.appendChild(this.renderer.domElement);
        }
    }

    createParticles() {
        const particleCount = 200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x667eea);
        const color2 = new THREE.Color(0x00d2ff);
        const color3 = new THREE.Color(0x764ba2);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Positions
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;

            // Colors - mix between the three colors
            const mixFactor1 = Math.random();
            const mixFactor2 = Math.random();
            const color = color1.clone().lerp(color2, mixFactor1).lerp(color3, mixFactor2);
            
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            // Sizes
            sizes[i] = Math.random() * 2 + 0.5;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    
                    // Add some movement
                    mvPosition.x += sin(time * 0.001 + position.y * 0.01) * 0.5;
                    mvPosition.y += cos(time * 0.001 + position.x * 0.01) * 0.5;
                    
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                    float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthTest: false,
            transparent: true,
            vertexColors: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createFloatingGeometries() {
        const geometryTypes = [
            new THREE.BoxGeometry(0.2, 0.2, 0.2),
            new THREE.SphereGeometry(0.1, 8, 6),
            new THREE.ConeGeometry(0.1, 0.3, 6),
            new THREE.OctahedronGeometry(0.15),
            new THREE.TetrahedronGeometry(0.15)
        ];

        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x667eea, 
                transparent: true, 
                opacity: 0.6,
                wireframe: true 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x00d2ff, 
                transparent: true, 
                opacity: 0.6,
                wireframe: true 
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x764ba2, 
                transparent: true, 
                opacity: 0.6,
                wireframe: true 
            })
        ];

        for (let i = 0; i < 15; i++) {
            const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10
            );

            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            // Store initial position and rotation for animation
            mesh.userData = {
                initialPosition: mesh.position.clone(),
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                floatSpeed: Math.random() * 0.01 + 0.005
            };

            this.geometries.push(mesh);
            this.scene.add(mesh);
        }
    }

    setupEventListeners() {
        // Mouse movement for parallax effect
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX - this.windowHalf.x) / this.windowHalf.x;
            this.mouse.y = -(event.clientY - this.windowHalf.y) / this.windowHalf.y;
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.windowHalf.x = window.innerWidth / 2;
            this.windowHalf.y = window.innerHeight / 2;
            
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Scroll effect
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = scrollY / maxScroll;
            
            // Move camera based on scroll
            this.camera.position.y = scrollProgress * 2;
            this.camera.rotation.x = scrollProgress * 0.1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const time = Date.now();

        // Update particle shader time
        if (this.particles.material.uniforms) {
            this.particles.material.uniforms.time.value = time;
        }

        // Rotate particles based on mouse
        this.particles.rotation.x += (this.mouse.y * 0.05 - this.particles.rotation.x) * 0.05;
        this.particles.rotation.y += (this.mouse.x * 0.05 - this.particles.rotation.y) * 0.05;

        // Animate floating geometries
        this.geometries.forEach((mesh, index) => {
            // Rotation
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            // Floating movement
            mesh.position.y = mesh.userData.initialPosition.y + 
                Math.sin(time * mesh.userData.floatSpeed + index) * 0.5;
            
            mesh.position.x = mesh.userData.initialPosition.x + 
                Math.cos(time * mesh.userData.floatSpeed * 0.5 + index) * 0.3;

            // Mouse interaction
            const mouseInfluence = 0.1;
            mesh.position.x += this.mouse.x * mouseInfluence;
            mesh.position.y += this.mouse.y * mouseInfluence;
        });

        // Camera sway
        this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }

    // Method to add explosion effect
    createExplosion(x, y) {
        const particleCount = 20;
        const explosionGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = x;
            positions[i3 + 1] = y;
            positions[i3 + 2] = 0;

            velocities.push({
                x: (Math.random() - 0.5) * 0.2,
                y: (Math.random() - 0.5) * 0.2,
                z: (Math.random() - 0.5) * 0.2
            });
        }

        explosionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const explosionMaterial = new THREE.PointsMaterial({
            color: 0x00d2ff,
            size: 0.1,
            transparent: true,
            opacity: 1
        });

        const explosion = new THREE.Points(explosionGeometry, explosionMaterial);
        this.scene.add(explosion);

        // Animate explosion
        let frame = 0;
        const animateExplosion = () => {
            frame++;
            const positions = explosion.geometry.attributes.position.array;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                positions[i3] += velocities[i].x;
                positions[i3 + 1] += velocities[i].y;
                positions[i3 + 2] += velocities[i].z;
            }

            explosion.geometry.attributes.position.needsUpdate = true;
            explosion.material.opacity = Math.max(0, 1 - frame / 60);

            if (frame < 60) {
                requestAnimationFrame(animateExplosion);
            } else {
                this.scene.remove(explosion);
            }
        };

        animateExplosion();
    }
}

// Initialize Three.js background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other elements to load
    setTimeout(() => {
        window.threeBackground = new ThreeBackground();
    }, 1000);
});

// Export for use in other scripts
window.ThreeBackground = ThreeBackground;
