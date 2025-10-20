import { motion } from 'framer-motion'

const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Conoce más sobre mi experiencia y pasión por el desarrollo web
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Mi Historia</h3>
              <p className="text-gray-300 mb-4">
                Soy un desarrollador Full Stack con pasión por crear soluciones web innovadoras. 
                Mi experiencia abarca desde el desarrollo frontend con React hasta la implementación 
                de APIs robustas con Python y Node.js.
              </p>
              <p className="text-gray-300 mb-4">
                Me especializo en transformar ideas complejas en aplicaciones web intuitivas y 
                eficientes, siempre manteniéndome actualizado con las últimas tecnologías y 
                mejores prácticas del desarrollo web.
              </p>
              <p className="text-gray-300">
                Cuando no estoy programando, disfruto aprendiendo nuevas tecnologías, 
                contribuyendo a proyectos de código abierto y compartiendo conocimiento 
                con la comunidad de desarrolladores.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="card">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Experiencia</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white">Desarrollador Full Stack</h4>
                  <p className="text-blue-400 text-sm">2022 - Presente</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Desarrollo de aplicaciones web modernas con React, Node.js y Python
                  </p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white">Desarrollador Frontend</h4>
                  <p className="text-purple-400 text-sm">2021 - 2022</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Especialización en interfaces de usuario responsivas y experiencia del usuario
                  </p>
                </div>
                <div className="border-l-2 border-green-500 pl-4">
                  <h4 className="font-semibold text-white">Estudiante Autodidacta</h4>
                  <p className="text-green-400 text-sm">2020 - 2021</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Aprendizaje intensivo de tecnologías web y programación
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
