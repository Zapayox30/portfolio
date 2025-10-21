import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { slideInFromBottom, bounceIn, floatingAnimation, pulseAnimation, buttonHover } from '../../utils/animations'
import TypingEffect from '../TypingEffect'
import FloatingLogos from '../FloatingLogos'

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#00d4ff"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        emissive="#001122"
        emissiveIntensity={0.2}
      />
    </Sphere>
  )
}

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00d4ff" />
            <pointLight position={[5, -5, 2]} intensity={0.6} color="#a855f7" />
            <AnimatedSphere />
            <FloatingLogos />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.2} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl -z-10"></div>
        
        <motion.div
          {...slideInFromBottom}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-12"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl"
            {...bounceIn}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Hola, soy{' '}
            <span 
              className="gradient-text"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #5b86e5 50%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block',
                fontWeight: 'bold'
              }}
            >
              Sandro Fernando
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl mx-auto drop-shadow-lg font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Desarrollador de Software e Ingeniero de Sistemas especializado en crear soluciones digitales que combinan funcionalidad y diseño
          </motion.p>

          <motion.div
            className="text-lg md:text-xl text-cyan-300 mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <TypingEffect 
              texts={[
                "Creador de Pomodomate.com",
                "Desarrollando con HTML, CSS y JavaScript",
                "Programando en Python, Java y C",
                "Ingeniero de Sistemas en formación",
                "Especialista en Excel y Power BI"
              ]}
              speed={80}
              deleteSpeed={40}
              pauseTime={2000}
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#proyectos"
              className="gradient-bg text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
              {...buttonHover}
            >
              Ver mis proyectos
            </motion.a>
            
            <motion.a
              href="#contacto"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center"
              {...buttonHover}
            >
              Contactar
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        {...floatingAnimation}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
          whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
