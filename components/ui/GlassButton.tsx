'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  external?: boolean
}

export default function GlassButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  external = false,
}: GlassButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const styles = {
    primary: {
      background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(167,139,250,0.2))',
      border: '1px solid rgba(34,211,238,0.4)',
      color: '#22d3ee',
      hoverBg: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3))',
      hoverShadow: '0 0 30px rgba(34,211,238,0.25), 0 0 60px rgba(34,211,238,0.1)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.8)',
      hoverBg: 'rgba(255,255,255,0.08)',
      hoverShadow: '0 0 20px rgba(255,255,255,0.05)',
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'rgba(255,255,255,0.5)',
      hoverBg: 'rgba(255,255,255,0.04)',
      hoverShadow: 'none',
    },
  }[variant]

  // Magnetic effect on hover
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.background = styles.background
    el.style.boxShadow = 'none'
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    el.style.background = styles.hoverBg
    el.style.boxShadow = styles.hoverShadow
  }

  const baseClass = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider font-body',
    'transition-[background,box-shadow,border-color] duration-300 cursor-pointer backdrop-blur-sm',
    className
  )

  const baseStyle = {
    background: styles.background,
    border: styles.border,
    color: styles.color,
    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s, box-shadow 0.3s',
  } as React.CSSProperties

  if (href) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseClass}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      className={baseClass}
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  )
}
