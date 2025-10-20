import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { Suspense } from 'react'

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
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00d4ff" />
            <pointLight position={[5, -5, 2]} intensity={0.6} color="#a855f7" />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="py-12"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
              Sandro
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Desarrollador Full Stack especializado en crear experiencias web modernas y funcionales
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#proyectos"
              className="gradient-bg text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver mis proyectos
            </motion.a>
            
            <motion.a
              href="#contacto"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300 inline-flex items-center justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactar
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
