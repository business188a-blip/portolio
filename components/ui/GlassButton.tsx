'use client'

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
  const styles = {
    primary: {
      background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(167,139,250,0.2))',
      border: '1px solid rgba(34,211,238,0.4)',
      color: '#22d3ee',
      hover: {
        background: 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(167,139,250,0.3))',
        boxShadow: '0 0 30px rgba(34,211,238,0.25)',
      },
    },
    secondary: {
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'rgba(255,255,255,0.8)',
      hover: {
        background: 'rgba(255,255,255,0.08)',
        boxShadow: '0 0 20px rgba(255,255,255,0.05)',
      },
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'rgba(255,255,255,0.6)',
      hover: {
        background: 'rgba(255,255,255,0.04)',
      },
    },
  }[variant]

  const baseClass = cn(
    'inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wider font-body',
    'transition-all duration-300 cursor-pointer backdrop-blur-sm',
    className
  )

  const props = {
    className: baseClass,
    style: {
      background: styles.background,
      border: styles.border,
      color: styles.color,
    } as React.CSSProperties,
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          Object.assign(el.style, styles.hover)
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.background = styles.background
          el.style.boxShadow = 'none'
        }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      {...props}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        Object.assign(el.style, styles.hover)
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.background = styles.background
        el.style.boxShadow = 'none'
      }}
    >
      {children}
    </motion.button>
  )
}
