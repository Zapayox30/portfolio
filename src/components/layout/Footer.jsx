import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="bg-dark-900 border-t border-white/10 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.p
            className="text-gray-400 text-sm"
            whileHover={{ color: '#ffffff' }}
            transition={{ duration: 0.2 }}
          >
            © {currentYear} Sandro Reátegui. Todos los derechos reservados.
          </motion.p>
          <motion.p
            className="text-gray-500 text-xs mt-2"
            whileHover={{ color: '#9ca3af' }}
            transition={{ duration: 0.2 }}
          >
            Desarrollado con React y ❤️
          </motion.p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
