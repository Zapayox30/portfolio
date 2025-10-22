import { motion } from 'framer-motion'
import { slideInFromBottom, bounceIn, floatingAnimation, buttonHover } from '../../utils/animations'
import TypingEffect from '../TypingEffect'
import FloatingLogos from '../FloatingLogos'

const heroHighlights = [
  {
    title: 'Experiencias inmersivas',
    description: 'Animaciones fluidas, microinteracciones y recorridos que hacen memorable cada flujo.',
    accent: 'from-cyan-400 to-blue-500'
  },
  {
    title: 'Entrega ágil',
    description: 'Iteraciones rápidas con métricas claras y despliegues continuos listos para producción.',
    accent: 'from-purple-400 to-pink-500'
  },
  {
    title: 'Diseño centrado en el usuario',
    description: 'Experiencias accesibles y adaptables en cualquier dispositivo, listas para escalar.',
    accent: 'from-emerald-400 to-teal-500',
    fullWidth: true
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

const heroCallouts = [
  {
    badge: 'Stack principal',
    title: 'React · Node.js · Python',
    description: 'Automatizando procesos, integrando APIs y dashboards con datos en vivo.',
    accent: 'from-cyan-400 to-blue-500'
  },
  {
    badge: 'Experiencia inmersiva',
    title: 'Modelado 3D interactivo',
    description: 'Escena optimizada con órbitas dinámicas y efectos suaves a 60fps.',
    accent: 'from-purple-400 to-pink-500'
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

      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:items-center">
        <motion.div
          {...slideInFromBottom}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="max-w-2xl space-y-8 text-center md:text-left"
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
            Desarrollador de Software e Ingeniero de Sistemas enfocado en experiencias digitales fluidas, accesibles y con métricas que impulsan el crecimiento de tu producto.
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
              <div key={metric.label} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
                <p className="text-3xl font-bold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-gray-300">{metric.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex w-full flex-col gap-8">
          <motion.div
            className="group relative min-h-[320px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 shadow-[0_35px_65px_rgba(15,23,42,0.55)] backdrop-blur-xl md:min-h-[420px]"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.95 }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen">
              <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
            </div>
            <FloatingLogos />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(192,132,252,0.18),transparent_60%)]" />

            <div className="pointer-events-none absolute left-6 top-6 z-20 max-w-[220px] text-left text-white">
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Modelado 3D
              </span>
              <p className="mt-3 text-sm text-white/80">
                Explora mi stack tecnológico en una escena ligera optimizada para cualquier dispositivo.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {heroCallouts.map((callout) => (
              <motion.div
                key={callout.badge}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-left backdrop-blur-xl"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-20">
                  <div className={`absolute -top-12 -right-10 h-36 w-36 rounded-full bg-gradient-to-br ${callout.accent} blur-3xl`} />
                </div>
                <div className="relative space-y-2">
                  <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${callout.accent} px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white shadow-lg`}>
                    {callout.badge}
                  </span>
                  <h4 className="text-lg font-semibold text-white">{callout.title}</h4>
                  <p className="text-sm text-gray-200">{callout.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.35 }}
          >
            {heroHighlights.map((item) => (
              <motion.div
                key={item.title}
                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all ${item.fullWidth ? 'sm:col-span-2' : ''}`}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                <div className="pointer-events-none absolute inset-0 opacity-20">
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
      </div>

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
