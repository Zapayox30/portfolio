import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const InteractiveBackground = () => {
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20, mass: 0.8 })
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20, mass: 0.8 })

  const translateX = useTransform(smoothX, [0, 1], ['-20%', '20%'])
  const translateY = useTransform(smoothY, [0, 1], ['-20%', '20%'])
  const rotate = useTransform(smoothX, [0, 1], ['0deg', '25deg'])

  useEffect(() => {
    const handlePointerMove = (event) => {
      const { innerWidth, innerHeight } = window
      pointerX.set(event.clientX / innerWidth)
      pointerY.set(event.clientY / innerHeight)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [pointerX, pointerY])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050510]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.25),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(124,58,237,0.18),_transparent_60%)]" />

      <motion.span
        className="absolute -top-24 -left-24 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.5),_transparent_70%)] blur-3xl"
        style={{ x: translateX, y: translateY }}
      />
      <motion.span
        className="absolute top-1/2 right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.4),_transparent_70%)] blur-3xl"
        style={{ x: translateX, y: translateY, rotate }}
      />
      <motion.span
        className="absolute bottom-[-10%] left-1/4 w-[30vw] h-[30vw] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.4),_transparent_70%)] blur-3xl"
        style={{ x: translateX, y: translateY }}
      />

      <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,%3Csvg width=\'300\' height=\'300\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3ClinearGradient id=\'g\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:rgba(59,130,246,0.15);stop-opacity:1\'/%3E%3Cstop offset=\'100%25\' style=\'stop-color:rgba(168,85,247,0.05);stop-opacity:1\'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath fill=\'url(%23g)\' d=\'M48.7,-66.6C63.8,-60,78.2,-51.2,85.9,-37.9C93.7,-24.5,94.7,-6.6,92.1,10.8C89.4,28.1,82.9,45,71.8,58.5C60.7,72,45,82.1,28.6,84.4C12.2,86.7,-5,81.2,-19.8,73.8C-34.7,66.4,-47.2,57.1,-57.7,45C-68.1,33,-76.4,18.1,-79.6,1.1C-82.9,-15.9,-81.1,-34,-71.5,-48.4C-62,-62.7,-44.7,-73.3,-27.1,-79.7C-9.4,-86.2,9.4,-88.5,26,-84.7C42.7,-81,58.5,-71.2,48.7,-66.6Z\' transform=\'translate(100 100) scale(1)\'/%3E%3C/svg%3E')]" />
    </div>
  )
}

export default InteractiveBackground
