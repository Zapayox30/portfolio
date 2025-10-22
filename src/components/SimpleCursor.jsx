import { useState, useEffect, useMemo } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTORS = 'a, button, [role="button"], input, textarea, select, .cursor-pointer'

const SimpleCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 30, mass: 0.6 })
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 30, mass: 0.6 })
  const cursorScale = useSpring(1, { stiffness: 250, damping: 25, mass: 0.8 })

  useEffect(() => {
    const prefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    setIsMobile(prefersCoarsePointer || isTouchDevice || window.innerWidth <= 768)

    const handleResize = () => {
      const updatedPrefersCoarsePointer = window.matchMedia('(pointer: coarse)').matches
      setIsMobile(updatedPrefersCoarsePointer || window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) {
      return undefined
    }

    const updateCursor = (event) => {
      cursorX.set(event.clientX)
      cursorY.set(event.clientY)
    }

    const handlePointerOver = (event) => {
      const interactiveElement = event.target.closest(INTERACTIVE_SELECTORS)
      if (interactiveElement) {
        cursorScale.set(1.35)
        setIsHovering(true)
      }
    }

    const handlePointerOut = (event) => {
      const interactiveElement = event.target.closest(INTERACTIVE_SELECTORS)
      if (interactiveElement) {
        cursorScale.set(1)
        setIsHovering(false)
      }
    }

    window.addEventListener('pointermove', updateCursor, { passive: true })
    document.addEventListener('pointerover', handlePointerOver, true)
    document.addEventListener('pointerout', handlePointerOut, true)

    return () => {
      window.removeEventListener('pointermove', updateCursor)
      document.removeEventListener('pointerover', handlePointerOver, true)
      document.removeEventListener('pointerout', handlePointerOut, true)
    }
  }, [cursorX, cursorY, cursorScale, isMobile])

  const cursorStyles = useMemo(
    () => ({
      transform: 'translate(-50%, -50%)',
      mixBlendMode: 'difference'
    }),
    []
  )

  if (isMobile) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[60] w-3 h-3 rounded-full bg-white"
        style={{ x: smoothX, y: smoothY, scale: cursorScale, ...cursorStyles }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[55] w-12 h-12 rounded-full border border-cyan-300/70 bg-cyan-300/5 backdrop-blur-sm"
        style={{
          x: smoothX,
          y: smoothY,
          scale: cursorScale,
          opacity: isHovering ? 0.8 : 0.4,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}

export default SimpleCursor
