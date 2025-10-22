import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

const stats = [
  {
    label: 'Proyectos completados',
    value: 18,
    suffix: '+',
    accent: 'from-cyan-400 to-blue-500',
    description: 'Soluciones digitales entregadas a clientes y proyectos personales',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5l9 4.5 9-4.5m-18 0L12 3l9 4.5m-18 0V18l9 4.5 9-4.5V7.5" />
      </svg>
    )
  },
  {
    label: 'Horas dedicadas',
    value: 1200,
    suffix: '+',
    accent: 'from-purple-400 to-pink-500',
    description: 'Experiencia invertida perfeccionando habilidades de desarrollo',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    label: 'Herramientas dominadas',
    value: 20,
    suffix: '+',
    accent: 'from-emerald-400 to-cyan-500',
    description: 'Stack moderno para construir experiencias fluidas y escalables',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M10.5 19.5L3 12l7.5-7.5" />
      </svg>
    )
  },
  {
    label: 'Clientes felices',
    value: 8,
    suffix: '+',
    accent: 'from-amber-400 to-orange-500',
    description: 'Colaboraciones exitosas con resultados medibles',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121a3 3 0 01-4.242 0M7.5 9.75h.008v.008H7.5V9.75zm9 0h.008v.008H16.5V9.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.28.939-.694 1.818-1.226 2.61C18.872 17.75 15.68 20 12 20s-6.872-2.25-8.316-5.39A10.451 10.451 0 012.458 12z" />
      </svg>
    )
  }
]

const services = [
  {
    title: 'Aplicaciones web inmersivas',
    description:
      'Desarrollo interfaces modernas con animaciones fluidas, integraciones con APIs y experiencias 3D ligeras.',
    highlights: ['Componentes interactivos', 'Integración de datos en tiempo real', 'Diseño responsive avanzado']
  },
  {
    title: 'Automatización y analítica',
    description:
      'Creo dashboards, flujos automatizados y reportes inteligentes que convierten datos en decisiones accionables.',
    highlights: ['Power BI y Excel avanzado', 'Integraciones con Python y SQL', 'Alertas y métricas personalizadas']
  },
  {
    title: 'Branding & storytelling digital',
    description:
      'Combino diseño y narrativa para potenciar la identidad digital de marcas y profesionales en la web.',
    highlights: ['Estrategia de contenido', 'Diseño UI/UX', 'Implementación multicanal']
  }
]

const AnimatedStat = ({ label, value, suffix, description, accent, icon, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return undefined

    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest))
    })

    return () => controls.stop()
  }, [delay, isInView, value])

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} blur-3xl`} />
      </div>
      <div className="relative flex items-center justify-between">
        <div className="text-cyan-100/90">{icon}</div>
        <motion.span
          className="flex items-baseline text-4xl font-bold text-white md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.2 }}
        >
          {displayValue}
          <span className="ml-1 text-3xl text-cyan-200">{suffix}</span>
        </motion.span>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white">{label}</h3>
      <p className="mt-2 text-sm text-gray-300">{description}</p>
    </motion.div>
  )
}

const Highlights = () => {
  return (
    <section id="destacados" className="relative py-20 px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-white/5 opacity-60" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
            Impacto real
          </span>
          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Resultados que <span className="gradient-text">hablan por sí mismos</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Combino diseño, código y estrategia para crear experiencias memorables que generan valor tangible.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.label} {...stat} delay={index * 0.1} />
          ))}
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-dark-900/60 p-8 shadow-[0_20px_45px_rgba(15,23,42,0.45)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
              style={{ transformPerspective: 1000 }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -top-32 left-0 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-transparent blur-3xl" />
              </div>

              <div className="relative">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-cyan-100/80">
                  {`0${index + 1}`}
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{service.description}</p>

                <ul className="mt-6 space-y-3 text-sm text-gray-200">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Highlights
