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

const heroMetrics = [
  {
    label: 'Proyectos entregados',
    value: '15+'
  },
  {
    label: 'Satisfacción del cliente',
    value: '98%'
  },
  {
    label: 'Tiempo de respuesta',
    value: 'Menos de 24h'
  }
]

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050510] via-[#08061a] to-[#050510]" />
      <div className="absolute inset-0 -z-[5]">
        <div className="pointer-events-none absolute left-1/2 top-[-30%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/25 via-transparent to-transparent blur-3xl opacity-90" />
        <div className="pointer-events-none absolute right-[-18%] bottom-[-35%] h-[38rem] w-[38rem] rounded-full bg-gradient-to-tr from-purple-500/20 via-transparent to-transparent blur-3xl opacity-75" />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </div>

      <FloatingLogos />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-16 px-4 md:flex-row md:items-center md:justify-between">
        <motion.div
          {...slideInFromBottom}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="max-w-2xl space-y-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl shadow-[0_25px_55px_rgba(15,23,42,0.55)] md:text-left"
        >
          <motion.span
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-cyan-200"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Desarrollo Full Stack & Diseño UI
          </motion.span>

          <motion.h1
            className="text-5xl font-bold md:text-7xl"
            {...bounceIn}
            transition={{ duration: 1, delay: 0.45 }}
          >
            Hola, soy{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {' '}Sandro Fernando
            </span>
          </motion.h1>

          <motion.p
            className="text-xl font-medium text-gray-200 md:text-2xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.6 }}
          >
            Desarrollador de Software e Ingeniero de Sistemas enfocado en experiencias digitales fluidas, accesibles y con
            métricas que impulsan el crecimiento de tu producto.
          </motion.p>

          <motion.div
            className="text-lg font-medium text-cyan-300 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <TypingEffect
              texts={[
                'Creador de Pomodomate.com',
                'Experto en interfaces dinámicas con React y Tailwind',
                'Integrando análisis de datos con Python y Power BI',
                'Automatizando procesos con Java y C',
                'Mentorando equipos y optimizando flujos de trabajo'
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
            transition={{ duration: 0.8, delay: 0.85 }}
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
            className="grid gap-4 pt-6 text-left sm:grid-cols-3"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-gray-300">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid w-full max-w-md gap-4 self-stretch md:max-w-lg"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {heroHighlights.map((item) => (
            <motion.div
              key={item.title}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur-lg"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-15">
                <div className={`absolute -top-16 -right-10 h-36 w-36 rounded-full bg-gradient-to-br ${item.accent} blur-3xl`} />
              </div>
              <div className="relative space-y-2">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </motion.div>
          ))}
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
