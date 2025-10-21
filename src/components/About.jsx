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
                Soy <strong>Sandro Fernando Reátegui Giles</strong>, desarrollador de software con formación en 
                <strong> Ingeniería de Sistemas</strong> en la Universidad Privada San Juan Bautista. 
                Me apasiona crear soluciones digitales que combinan funcionalidad y diseño excepcional.
              </p>
              <p className="text-gray-300 mb-4">
                Cuento con experiencia práctica desarrollando aplicaciones web como <strong>Pomodomate.com</strong>, 
                un proyecto propio basado en la técnica Pomodoro, y he implementado sistemas automatizados 
                de inventario para negocios, además de colaborar en proyectos multimedia educativos inclusivos 
                orientados a niños con TEA.
              </p>
              <p className="text-gray-300">
                Me considero una persona orientada a resultados, con gran interés en la innovación tecnológica, 
                el desarrollo web moderno y la creación de experiencias digitales centradas en el usuario. 
                Hablo español nativo e inglés intermedio técnico.
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
                  <p className="text-blue-400 text-sm">2023 - Presente</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Desarrollo de Pomodomate.com y otras aplicaciones web con tecnologías modernas
                  </p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white">Desarrollador de Sistemas</h4>
                  <p className="text-purple-400 text-sm">2022 - 2023</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Implementación de sistema automatizado de inventario en Excel para negocio familiar
                  </p>
                </div>
                <div className="border-l-2 border-green-500 pl-4">
                  <h4 className="font-semibold text-white">Colaborador en Proyecto Educativo</h4>
                  <p className="text-green-400 text-sm">2022</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Proyecto multimedia educativo inclusivo orientado a niños con TEA
                  </p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-white">Estudiante de Ingeniería de Sistemas</h4>
                  <p className="text-cyan-400 text-sm">Universidad Privada San Juan Bautista</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Formación académica en desarrollo de software y sistemas
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
