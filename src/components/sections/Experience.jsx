import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    title: 'Fundador & Full Stack Developer',
    company: 'Pomodomate.com',
    period: '2023 - Presente',
    location: 'Proyecto propio',
    description:
      'Diseño, desarrollo y lanzamiento de una plataforma de productividad basada en la técnica Pomodoro con analíticas y cuentas personalizadas.',
    achievements: [
      'Automatización de flujos de usuarios y almacenamiento en Firebase',
      'UI responsiva con animaciones y experiencias inmersivas',
      'Incremento de retención del 35% gracias a métricas y gamificación'
    ]
  },
  {
    title: 'Especialista en Automatización de Datos',
    company: 'Negocio familiar',
    period: '2022 - 2023',
    location: 'Pisco, Perú',
    description:
      'Implementé un sistema integral de inventario en Excel y Power BI para digitalizar procesos y reportes comerciales.',
    achievements: [
      'Integración de macros VBA para registrar y alertar stock en tiempo real',
      'Dashboards interactivos para seguimiento de ventas y compras',
      'Reducción del 40% en errores de registro manual'
    ]
  },
  {
    title: 'Colaborador en Proyecto Educativo Inclusivo',
    company: 'Universidad Privada San Juan Bautista',
    period: '2022',
    location: 'Lima, Perú',
    description:
      'Producción de recursos digitales y contenido audiovisual para proyecto educativo orientado a niños con TEA.',
    achievements: [
      'Diseño de actividades interactivas multiplataforma',
      'Coordinación con equipos multidisciplinarios',
      'Implementación de narrativa accesible y adaptable'
    ]
  }
]

const ExperienceItem = ({ experience, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <li ref={ref} className="relative pl-12">
      <motion.span
        className="absolute left-1 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-cyan-400/50 bg-dark-900/90"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
      </motion.span>
      <motion.div
        className="group relative overflow-hidden rounded-3xl border border-white/5 bg-dark-900/60 p-8 shadow-[0_25px_40px_rgba(15,23,42,0.4)]"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.1 }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -top-24 right-0 h-52 w-52 rounded-full bg-gradient-to-br from-blue-500/25 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-transparent blur-3xl" />
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3 text-sm uppercase tracking-widest text-cyan-200/80">
          <span>{experience.period}</span>
          <span className="text-white/70">{experience.location}</span>
        </div>
        <h3 className="relative mt-4 text-2xl font-semibold text-white">{experience.title}</h3>
        <p className="mt-1 text-sm font-medium text-cyan-200/80">{experience.company}</p>
        <p className="mt-4 text-gray-300">{experience.description}</p>

        <ul className="mt-6 space-y-3 text-sm text-gray-200">
          {experience.achievements.map((achievement) => (
            <li key={achievement} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </li>
  )
}

const Experience = () => {
  return (
    <section id="experiencia" className="relative py-20 px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.06),_transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
            Trayectoria
          </span>
          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Experiencia <span className="gradient-text">relevante</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Cada proyecto me ha permitido unir tecnología, estrategia y creatividad para resolver problemas reales.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-cyan-500/60 via-blue-500/40 to-purple-500/40" />
          <ul className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceItem key={experience.title} experience={experience} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Experience
