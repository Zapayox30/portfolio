import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/LoadingScreen'
import SimpleCursor from './components/SimpleCursor'
import InteractiveBackground from './components/InteractiveBackground'

// Lazy load section components for better performance
const Hero = lazy(() => import('./components/sections/Hero'))
const Highlights = lazy(() => import('./components/sections/Highlights'))
const About = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const Contact = lazy(() => import('./components/Contact'))

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden text-white">
      <InteractiveBackground />
      <SimpleCursor />
      <Navbar />

      <Suspense fallback={<LoadingScreen />}>
        <main>
            {/* Hero Section */}
            <motion.section
              id="inicio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Hero />
            </motion.section>

            {/* Highlights Section */}
            <motion.section
              id="destacados"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Highlights />
            </motion.section>

            {/* About Section */}
            <motion.section
              id="sobre-mi"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <About />
            </motion.section>

            {/* Experience Section */}
            <motion.section
              id="experiencia"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Experience />
            </motion.section>

            {/* Skills Section */}
            <motion.section
              id="habilidades"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Skills />
            </motion.section>

            {/* Projects Section */}
            <motion.section
              id="proyectos"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Projects />
            </motion.section>

            {/* Testimonials Section */}
            <motion.section
              id="testimonios"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Testimonials />
            </motion.section>

            {/* Contact Section */}
            <motion.section
              id="contacto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Contact />
            </motion.section>
        </main>
      </Suspense>

      <Footer />
    </div>
  )
}

export default App
