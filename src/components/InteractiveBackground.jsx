import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const InteractiveBackground = () => {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const glowX = useSpring(pointerX, { stiffness: 55, damping: 20, mass: 0.8 })
  const glowY = useSpring(pointerY, { stiffness: 55, damping: 20, mass: 0.8 })
  const accentX = useSpring(pointerX, { stiffness: 45, damping: 18, mass: 0.9 })
  const accentY = useSpring(pointerY, { stiffness: 45, damping: 18, mass: 0.9 })

  useEffect(() => {
    let frame = 0

    const handlePointerMove = (event) => {
      if (frame) cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window
        const offsetX = ((event.clientX / innerWidth) - 0.5) * 80
        const offsetY = ((event.clientY / innerHeight) - 0.5) * 80

        pointerX.set(offsetX)
        pointerY.set(offsetY)
      })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [pointerX, pointerY])

  return (
    <motion.div
      className="fixed inset-0 -z-10 overflow-hidden bg-[#050510]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_60%)]" />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-25%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-400/35 via-transparent to-transparent blur-3xl opacity-90"
        style={{ x: glowX, y: glowY }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-20%] bottom-[-30%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-purple-500/25 via-transparent to-transparent blur-3xl opacity-75"
        style={{ x: accentX, y: accentY }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(56,189,248,0.15), transparent 55%), " +
            "radial-gradient(circle at 80% 0%, rgba(165,180,252,0.1), transparent 55%), " +
            "radial-gradient(circle at 50% 80%, rgba(192,132,252,0.12), transparent 60%)"
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(148,163,184,0.12) 0%, transparent 55%), " +
            "linear-gradient(300deg, rgba(226,232,240,0.1) 0%, transparent 60%)"
        }}
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'220\' height=\'220\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath fill=\'rgba(94,234,212,0.12)\' d=\'M47.7,-60C61.5,-55.2,72.4,-41.1,77.7,-25.8C83,-10.5,82.6,5.9,77.3,20.5C72,35.1,61.7,47.9,48.3,57.8C35,67.7,18.5,74.7,1.4,72.9C-15.6,71.1,-31.2,60.4,-45,48.8C-58.7,37.2,-70.5,24.7,-74.1,9.5C-77.8,-5.8,-73.3,-23.7,-62.5,-35.5C-51.7,-47.3,-34.5,-53,-18.3,-57.6C-2.1,-62.3,13,-65.9,27.1,-63.4C41.3,-60.9,54.5,-52.3,47.7,-60Z\' transform=\'translate(100 100)\'/%3E%3C/svg%3E')] opacity-20 mix-blend-screen"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

export default InteractiveBackground
