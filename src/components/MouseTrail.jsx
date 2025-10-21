import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const MouseTrail = () => {
  const [trail, setTrail] = useState([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const trailLength = 15
  const intervalRef = useRef()

  useEffect(() => {
    const updateMousePosition = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)
      
      setTrail(prevTrail => {
        const newTrail = [newPosition, ...prevTrail.slice(0, trailLength - 1)]
        return newTrail
      })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {trail.map((position, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: position.x - 4,
            top: position.y - 4,
            background: `linear-gradient(45deg, 
              rgba(0, 212, 255, ${0.8 - (index * 0.05)}), 
              rgba(168, 85, 247, ${0.6 - (index * 0.04)})
            )`,
            scale: 1 - (index * 0.06),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1 - (index * 0.06), 
            opacity: 0.8 - (index * 0.05) 
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

export default MouseTrail
