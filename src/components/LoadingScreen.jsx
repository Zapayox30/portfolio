import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-dark-950 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <motion.p
          className="text-xl font-medium text-gray-300"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Cargando...
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
