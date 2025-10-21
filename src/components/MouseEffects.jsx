import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MouseEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [trail, setTrail] = useState([])
  const [clicks, setClicks] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  
  // Refs para optimización
  const lastUpdateTime = useRef(0)
  const animationFrameId = useRef(null)

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Optimizar actualización del mouse con throttling más agresivo
  const updateMousePosition = useCallback((e) => {
    const now = Date.now()
    
    // Throttle más agresivo - 30fps máximo para mejor performance
    if (now - lastUpdateTime.current < 33) return
    
    lastUpdateTime.current = now
    const newPosition = { x: e.clientX, y: e.clientY, timestamp: now }
    
    setMousePosition(newPosition)
    
    // Reducir trail a solo 3 puntos para máxima fluidez
    setTrail(prevTrail => {
      const newTrail = [newPosition, ...prevTrail.slice(0, 2)]
      return newTrail
    })
  }, [])

  // Handlers optimizados
  const handleMouseEnter = useCallback((e) => {
    const target = e.target
    
    if (target.matches('a, button, [role="button"]')) {
      setIsHovering(true)
      setCursorVariant('button')
    } else if (target.matches('.cursor-pointer')) {
      setIsHovering(true)
      setCursorVariant('pointer')
    }
  }, [])

  const handleMouseLeave = useCallback((e) => {
    const target = e.target
    
    if (target.matches('a, button, [role="button"], .cursor-pointer')) {
      setIsHovering(false)
      setCursorVariant('default')
    }
  }, [])

  const handleClick = useCallback((e) => {
    const newClick = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    }
    setClicks(prev => [...prev.slice(-2), newClick]) // Máximo 3 clicks
    
    // Remover click después de la animación
    setTimeout(() => {
      setClicks(prev => prev.filter(click => click.id !== newClick.id))
    }, 400) // Reducir tiempo
  }, [])

  useEffect(() => {
    // Event listeners optimizados
    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true })
    document.addEventListener('click', handleClick, { passive: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('click', handleClick)
    }
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave, handleClick])

  // Limpiar trail viejo para evitar acumulación
  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail(prev => prev.slice(0, 3)) // Mantener solo los últimos 3 puntos
    }, 150)

    return () => clearInterval(cleanup)
  }, [])

  // Simplificar - ya no necesitamos cursorVariants complejas

  // No mostrar efectos en dispositivos móviles
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Cursor principal */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-3 h-3 rounded-full bg-white mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.1,
          ease: "easeOut"
        }}
      />

      {/* Cursor de seguimiento */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-6 h-6 rounded-full border border-cyan-400"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "easeOut"
        }}
      />

      {/* Trail de puntos ultra simplificado */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {trail.slice(0, 3).map((position, index) => (
          <div
            key={`${position.timestamp}-${index}`}
            className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400"
            style={{
              left: position.x,
              top: position.y,
              opacity: 0.5 - (index * 0.15),
              transform: `scale(${1 - (index * 0.2)})`,
            }}
          />
        ))}
      </div>

      {/* Efectos de click simplificados */}
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            className="fixed pointer-events-none z-45 w-6 h-6 border border-cyan-400 rounded-full"
            style={{
              left: click.x - 12,
              top: click.y - 12,
            }}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}

export default MouseEffects
