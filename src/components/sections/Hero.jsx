import { motion } from 'framer-motion'
import { slideInFromBottom, bounceIn, floatingAnimation, buttonHover } from '../../utils/animations'
import TypingEffect from '../TypingEffect'
import FloatingLogos from '../FloatingLogos'

const heroHighlights = [
  {
    title: 'Experiencias inmersivas',
    description: 'Animaciones fluidas y microinteracciones que elevan la usabilidad.',
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
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050510] via-[#06061a] to-[#050510]" />
      <div className="absolute inset-0 -z-[5]">
        <div className="pointer-events-none absolute left-1/2 top-[-30%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/30 via-transparent to-transparent blur-3xl opacity-80 animate-[spin_55s_linear_infinite]" />
        <div className="pointer-events-none absolute right-[-20%] bottom-[-35%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-purple-500/25 via-transparent to-transparent blur-3xl opacity-70 animate-[spin_70s_linear_infinite_reverse]" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      </div>

      <FloatingLogos />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          {...slideInFromBottom}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-[0_25px_55px_rgba(15,23,42,0.5)]"
        >
          <motion.h1
            className="mb-6 text-5xl font-bold md:text-7xl"
            {...bounceIn}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Hola, soy{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Sandro Fernando
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mb-4 max-w-2xl text-xl font-medium text-gray-200 md:text-2xl"
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
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-lg"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        {...floatingAnimation}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 h-3 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
