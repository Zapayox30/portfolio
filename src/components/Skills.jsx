import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, skillBarAnimation, cardHover } from '../utils/animations'

const SkillBar = ({ name, level, delay = 0 }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-sm text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  )
}

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'React', level: 80 },
        { name: 'Figma', level: 75 }
      ]
    },
    {
      title: 'Backend & Programación',
      skills: [
        { name: 'Python', level: 85 },
        { name: 'Java', level: 80 },
        { name: 'C', level: 75 },
        { name: 'SQL', level: 80 },
        { name: 'Firebase', level: 70 }
      ]
    },
    {
      title: 'Herramientas & Análisis',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Excel', level: 90 },
        { name: 'Power BI', level: 75 },
        { name: 'Vercel', level: 80 },
        { name: 'Adobe Suite', level: 70 }
      ]
    }
  ]

  return (
    <section className="py-20 px-4 bg-dark-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mis <span className="text-gradient">Habilidades</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones completas
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          {...staggerContainer}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="card"
              {...fadeInUp}
              {...cardHover}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 gradient-text">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={skillIndex * 0.1 + categoryIndex * 0.3}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
