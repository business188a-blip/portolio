'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassButton from '@/components/ui/GlassButton'

gsap.registerPlugin(ScrollTrigger)

const ROLES = ['AI Systems Developer', 'Python Architect', 'LLM Engineer', 'SaaS Builder']

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const orbRef1 = useRef<HTMLDivElement>(null)
  const orbRef2 = useRef<HTMLDivElement>(null)

  // Typewriter
  useEffect(() => {
    let current = 0
    let charIndex = 0
    let deleting = false
    let timeout: NodeJS.Timeout

    const type = () => {
      const el = roleRef.current
      if (!el) return
      const word = ROLES[current]
      if (!deleting) {
        el.textContent = word.slice(0, charIndex + 1)
        charIndex++
        if (charIndex === word.length) {
          deleting = true
          timeout = setTimeout(type, 2000)
          return
        }
      } else {
        el.textContent = word.slice(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
          deleting = false
          current = (current + 1) % ROLES.length
        }
      }
      timeout = setTimeout(type, deleting ? 50 : 80)
    }
    timeout = setTimeout(type, 1000)
    return () => clearTimeout(timeout)
  }, [])

  // GSAP — hero fades into space as you scroll away
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content drifts up and fades out on scroll
      gsap.to(contentRef.current, {
        y: -120,
        opacity: 0,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Orb 1 — fast parallax
      gsap.to(orbRef1.current, {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // Orb 2 — slow parallax (depth illusion)
      gsap.to(orbRef2.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 3,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Glow orbs */}
      <div
        ref={orbRef1}
        className="orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          animation: 'pulseGlow 6s ease-in-out infinite',
        }}
      />
      <div
        ref={orbRef2}
        className="orb w-[400px] h-[400px] top-1/3 left-1/4"
        style={{
          background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
          animation: 'pulseGlow 8s ease-in-out infinite 2s',
        }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)',
          animation: 'scanLine 6s linear infinite',
          zIndex: 5,
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-mono"
              style={{
                background: 'rgba(34,211,238,0.08)',
                border: '1px solid rgba(34,211,238,0.2)',
                color: '#22d3ee',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{ animation: 'pulseGlow 2s ease-in-out infinite' }}
              />
              Open to Remote Work
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display font-light leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '-0.02em' }}
          >
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>I am</span>{' '}
            <span className="gradient-text">Arslan</span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="font-mono text-sm md:text-base tracking-widest mb-8"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            &gt;{' '}
            <span ref={roleRef} style={{ color: '#22d3ee' }}>
              AI Systems Developer
            </span>
            <span
              className="inline-block w-0.5 h-4 ml-0.5"
              style={{
                background: '#22d3ee',
                animation: 'pulseGlow 1s ease-in-out infinite',
                verticalAlign: 'middle',
              }}
            />
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-body font-light text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Building intelligent systems that think, automate, and scale.
            Python · LLMs · FastAPI · React.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <GlassButton href="#projects" variant="primary">View Projects</GlassButton>
            <GlassButton href="#contact" variant="secondary">Get in Touch</GlassButton>
            <GlassButton href="https://github.com/business188a-blip" variant="ghost" external>
              GitHub ↗
            </GlassButton>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-20 flex flex-col items-center gap-2">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
              scroll
            </span>
            <div
              className="w-px h-12"
              style={{
                background: 'linear-gradient(to bottom, rgba(34,211,238,0.5), transparent)',
                animation: 'float 2s ease-in-out infinite',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
