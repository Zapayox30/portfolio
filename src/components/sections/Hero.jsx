import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import { slideInFromBottom, bounceIn, floatingAnimation, buttonHover } from '../../utils/animations'
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

const heroHighlights = [
  {
    title: 'Experiencias inmersivas',
    description: 'Animaciones 3D ligeras y microinteracciones que elevan la usabilidad.',
    accent: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'Entrega ágil',
    description: 'Iteraciones rápidas con métricas claras y enfoque en resultados tangibles.',
    accent: 'from-purple-400 to-pink-500'
  },
  {
    title: 'Diseño centrado en el usuario',
    description: 'Experiencias accesibles y adaptables en cualquier dispositivo.',
    accent: 'from-emerald-400 to-teal-500'
  }
]

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Background overlay for better text readability */}
        <div className="absolute inset-0 -z-10 rounded-3xl bg-black/20 backdrop-blur-sm"></div>

        <motion.div {...slideInFromBottom} transition={{ duration: 0.8, delay: 0.2 }} className="py-12">
          <motion.h1
            className="mb-6 text-5xl font-bold drop-shadow-2xl md:text-7xl"
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
            className="mx-auto mb-4 max-w-2xl text-xl font-medium text-gray-200 drop-shadow-lg md:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Desarrollador de Software e Ingeniero de Sistemas especializado en crear soluciones digitales que combinan
            funcionalidad y diseño
          </motion.p>

          <motion.div
            className="mb-8 text-lg font-medium text-cyan-300 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <TypingEffect
              texts={[
                'Creador de Pomodomate.com',
                'Desarrollando con HTML, CSS y JavaScript',
                'Programando en Python, Java y C',
                'Ingeniero de Sistemas en formación',
                'Especialista en Excel y Power BI'
              ]}
              speed={80}
              deleteSpeed={40}
              pauseTime={2000}
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#proyectos"
              className="gradient-bg inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-white shadow-2xl transition-all duration-300 hover:shadow-blue-500/25"
              {...buttonHover}
            >
              Ver mis proyectos
            </motion.a>

            <motion.a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              {...buttonHover}
            >
              Contactar
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-4 text-left sm:grid-cols-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {heroHighlights.map((item) => (
              <motion.div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <div className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${item.accent} blur-3xl`} />
                </div>
                <div className="relative">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        {...floatingAnimation}
      >
        <motion.div
          className="flex h-10 w-6 cursor-pointer justify-center rounded-full border-2 border-white/30"
          whileHover={{ scale: 1.1, borderColor: 'rgba(255,255,255,0.6)' }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 h-3 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
