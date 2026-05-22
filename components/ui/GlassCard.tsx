'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: 'cyan' | 'violet' | 'none'
  tilt?: boolean
}

export default function GlassCard({
  children,
  className,
  glow = 'none',
  tilt = true,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { stiffness: 200, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-8deg', '8deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const glowStyle = {
    cyan: 'shadow-glow-cyan',
    violet: 'shadow-glow-violet',
    none: '',
  }[glow]

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: tilt ? rotateX : 0, rotateY: tilt ? rotateY : 0, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'glass rounded-2xl p-6 cursor-default',
        glowStyle,
        className
      )}
    >
      {children}
    </motion.div>
  )
}
