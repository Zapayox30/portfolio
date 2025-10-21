import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const SimpleCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const lastUpdateTime = useRef(0)

  // Detectar móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Actualización ultra optimizada del mouse
  const updateMousePosition = useCallback((e) => {
    const now = Date.now()
    
    // Throttle muy agresivo - solo 20fps
    if (now - lastUpdateTime.current < 50) return
    
    lastUpdateTime.current = now
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseEnter = useCallback((e) => {
    if (e.target.matches('a, button, [role="button"], .cursor-pointer')) {
      setIsHovering(true)
    }
  }, [])

  const handleMouseLeave = useCallback((e) => {
    if (e.target.matches('a, button, [role="button"], .cursor-pointer')) {
      setIsHovering(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true, capture: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true, capture: true })

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave])

  if (isMobile) {
    return null
  }

  return (
    <>
      {/* Cursor principal minimalista */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 w-2 h-2 rounded-full bg-white mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.05,
          ease: "linear"
        }}
      />

      {/* Cursor de seguimiento minimalista */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40 w-4 h-4 rounded-full border border-cyan-400"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.3
        }}
        transition={{
          type: "tween",
          duration: 0.15,
          ease: "linear"
        }}
      />
    </>
  )
}

export default SimpleCursor
