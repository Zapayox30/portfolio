import { useState, useEffect } from 'react'

export const useCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [cursorVariant, setCursorVariant] = useState('default')

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e) => {
      const target = e.target
      
      if (target.matches('a, button, [role="button"]')) {
        setIsHovering(true)
        setCursorVariant('button')
      } else if (target.matches('input, textarea, [contenteditable]')) {
        setIsHovering(true)
        setCursorVariant('text')
      } else if (target.matches('.cursor-pointer')) {
        setIsHovering(true)
        setCursorVariant('pointer')
      }
    }

    const handleMouseLeave = (e) => {
      const target = e.target
      
      if (target.matches('a, button, [role="button"], input, textarea, [contenteditable], .cursor-pointer')) {
        setIsHovering(false)
        setCursorVariant('default')
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
    }
  }, [])

  return {
    mousePosition,
    isHovering,
    cursorVariant
  }
}
