import { Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/LoadingScreen'
import SimpleCursor from './components/SimpleCursor'

// Lazy load section components for better performance
const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Contact = lazy(() => import('./components/Contact'))

function App() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <SimpleCursor />
      <Navbar />
      
      <AnimatePresence mode="wait">
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
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default App
