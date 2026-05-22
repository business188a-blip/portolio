'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-2xl font-light tracking-wider"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            AA
            <span className="gradient-text">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm tracking-widest uppercase text-white/50 hover:text-white/90 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-body tracking-wide transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))',
              border: '1px solid rgba(34,211,238,0.3)',
              color: '#22d3ee',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'linear-gradient(135deg, rgba(34,211,238,0.25), rgba(167,139,250,0.25))'
              el.style.boxShadow = '0 0 20px rgba(34,211,238,0.2)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))'
              el.style.boxShadow = 'none'
            }}
          >
            Hire Me
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={cn(
                'block w-6 h-px bg-white/70 transition-all duration-300',
                menuOpen && 'rotate-45 translate-y-2'
              )}
            />
            <span
              className={cn(
                'block w-6 h-px bg-white/70 transition-all duration-300',
                menuOpen && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block w-6 h-px bg-white/70 transition-all duration-300',
                menuOpen && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass-strong flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="font-display text-4xl font-light text-white/80 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
