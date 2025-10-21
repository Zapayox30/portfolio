import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MouseEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [trail, setTrail] = useState([])
  const [particles, setParticles] = useState([])
  const [clicks, setClicks] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY, timestamp: Date.now() }
      setMousePosition(newPosition)
      
      // Actualizar trail
      setTrail(prevTrail => {
        const newTrail = [newPosition, ...prevTrail.slice(0, 12)]
        return newTrail
      })

      // Crear partículas ocasionalmente
      if (Math.random() > 0.85) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 3 + 1,
          opacity: 1,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60
        }
        
        setParticles(prev => [...prev.slice(-30), newParticle])
      }
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      
      if (target.matches('a, button, [role="button"]')) {
        setIsHovering(true)
        setCursorVariant('button')
      } else if (target.matches('.cursor-pointer')) {
        setIsHovering(true)
        setCursorVariant('pointer')
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      
      if (target.matches('a, button, [role="button"], .cursor-pointer')) {
        setIsHovering(false)
        setCursorVariant('default')
      }
    }

    const handleClick = (e) => {
      const newClick = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY
      }
      setClicks(prev => [...prev, newClick])
      
      // Remover click después de la animación
      setTimeout(() => {
        setClicks(prev => prev.filter(click => click.id !== newClick.id))
      }, 600)
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Animar partículas
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          opacity: particle.opacity - 0.02,
          life: particle.life - 1,
          size: particle.size * 0.99
        })).filter(particle => particle.life > 0 && particle.opacity > 0)
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      border: "2px solid rgba(0, 212, 255, 0.5)"
    },
    button: {
      scale: 1.5,
      backgroundColor: "rgba(0, 212, 255, 0.2)",
      border: "2px solid rgba(0, 212, 255, 0.8)"
    },
    pointer: {
      scale: 1.2,
      backgroundColor: "rgba(168, 85, 247, 0.2)",
      border: "2px solid rgba(168, 85, 247, 0.8)"
    }
  }

  // No mostrar efectos en dispositivos móviles
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-4 h-4 rounded-full mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          ...cursorVariants[cursorVariant]
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Cursor de seguimiento */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-8 h-8 rounded-full border-2 border-cyan-400"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 1
        }}
      />

      {/* Trail de puntos */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {trail.map((position, index) => (
          <motion.div
            key={`${position.timestamp}-${index}`}
            className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
            style={{
              left: position.x - 2,
              top: position.y - 2,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1 - (index * 0.08), 
              opacity: 0.8 - (index * 0.06) 
            }}
            transition={{ 
              duration: 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Partículas flotantes */}
      <div className="fixed inset-0 pointer-events-none z-25">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-300 to-blue-400"
            style={{
              left: particle.x - particle.size / 2,
              top: particle.y - particle.size / 2,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          />
        ))}
      </div>

      {/* Efectos de click */}
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            className="fixed pointer-events-none z-45"
            style={{
              left: click.x - 15,
              top: click.y - 15,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-8 h-8 border-2 border-cyan-400 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}

export default MouseEffects
