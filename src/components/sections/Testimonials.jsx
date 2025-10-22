import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const testimonials = [
  {
    name: 'María Torres',
    role: 'Emprendedora digital',
    message:
      'Sandro transformó una idea borrosa en una plataforma funcional que mis clientes usan a diario. El enfoque iterativo y el cuidado por los detalles visuales marcaron la diferencia.',
    project: 'Branding y sitio web para academia online'
  },
  {
    name: 'Luis Gutiérrez',
    role: 'Gerente de operaciones',
    message:
      'Gracias a la automatización creada, pasamos de reportes manuales en horas a dashboards en minutos. La capacitación y documentación que entregó facilitaron la adopción del sistema.',
    project: 'Dashboard de inventario y ventas con Power BI'
  },
  {
    name: 'Cinthia Reyes',
    role: 'Docente e investigadora',
    message:
      'Su sensibilidad para crear experiencias inclusivas fue clave. Los prototipos interactivos y pruebas con usuarios demostraron su compromiso con la accesibilidad.',
    project: 'Recursos multimedia para proyecto educativo inclusivo'
  }
]

const variants = {
  enter: { opacity: 0, x: 40, scale: 0.95 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -40, scale: 0.95 }
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (index) => {
    setActiveIndex(index)
  }

  return (
    <section id="testimonios" className="relative py-20 px-4">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-white/5 opacity-50" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
            Testimonios
          </span>
          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Historias de <span className="gradient-text">éxito</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            La mejor carta de presentación es el impacto que genero junto a cada aliado estratégico.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="pointer-events-none absolute -top-20 -left-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-16 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-dark-900/70 p-10 backdrop-blur-xl shadow-[0_25px_45px_rgba(15,23,42,0.45)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].name}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                <motion.blockquote className="text-xl leading-relaxed text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  “{testimonials[activeIndex].message}”
                </motion.blockquote>

                <motion.div
                  className="mt-10 flex flex-col items-start gap-1 text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-lg font-semibold text-white">{testimonials[activeIndex].name}</span>
                  <span className="text-sm uppercase tracking-widest text-cyan-200/80">{testimonials[activeIndex].role}</span>
                  <span className="text-sm text-gray-400">{testimonials[activeIndex].project}</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between">
              <motion.button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChange((activeIndex - 1 + testimonials.length) % testimonials.length)}
              >
                Anterior
              </motion.button>
              <div className="flex gap-3">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => handleChange(index)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === activeIndex ? 'bg-cyan-400 scale-110' : 'bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Ver testimonio de ${testimonial.name}`}
                  />
                ))}
              </div>
              <motion.button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleChange((activeIndex + 1) % testimonials.length)}
              >
                Siguiente
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
