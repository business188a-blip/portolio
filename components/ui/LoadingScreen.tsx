'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')
  const lineRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading progress
    const steps = [20, 45, 70, 88, 100]
    let i = 0
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
        setTimeout(tick, i === steps.length ? 400 : 300 + Math.random() * 200)
      } else {
        setTimeout(() => setPhase('reveal'), 600)
      }
    }
    setTimeout(tick, 300)
  }, [])

  useEffect(() => {
    if (phase === 'reveal' && lineRef.current) {
      // Animate SVG signature path
      const length = lineRef.current.getTotalLength()
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        onComplete: () => {
          setTimeout(() => {
            setPhase('done')
            setTimeout(onComplete, 800)
          }, 500)
        },
      })
    }
  }, [phase, onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#050508' }}
        >
          {/* Background orb */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'pulseGlow 3s ease-in-out infinite',
            }}
          />

          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Logo mark */}
                <div className="relative">
                  <span
                    className="font-display text-6xl font-light"
                    style={{ color: 'rgba(255,255,255,0.08)' }}
                  >
                    AA
                  </span>
                  <span
                    className="absolute inset-0 font-display text-6xl font-light gradient-text flex items-center justify-center"
                    style={{ clipPath: `inset(0 ${100 - progress}% 0 0)`, transition: 'clip-path 0.4s ease' }}
                  >
                    AA
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-48 h-px relative overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <motion.div
                      className="absolute left-0 top-0 h-full"
                      style={{
                        background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
                        boxShadow: '0 0 10px rgba(34,211,238,0.5)',
                      }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                  <span
                    className="font-mono text-xs tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.2)' }}
                  >
                    {progress}%
                  </span>
                </div>
              </motion.div>
            )}

            {phase === 'reveal' && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                {/* SVG Signature */}
                <svg
                  viewBox="0 0 300 80"
                  width="300"
                  height="80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    ref={lineRef}
                    d="M 20 60 
                       L 40 20 L 60 60 
                       M 30 45 L 50 45
                       M 75 20 L 75 60
                       M 75 20 Q 95 20 95 35 Q 95 50 75 50 L 95 60
                       M 110 60 L 110 20 L 130 20 L 130 40 L 110 40 L 130 60
                       M 145 20 L 165 20 L 145 60 L 165 60
                       M 145 40 L 165 40
                       M 180 20 L 180 60 M 180 20 Q 210 20 210 40 Q 210 60 180 60
                       M 225 20 L 245 60 M 265 20 L 245 60
                       M 230 47 L 260 47"
                    stroke="url(#sigGrad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0"
                  />
                  <defs>
                    <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="font-mono text-xs tracking-[0.4em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  Arslan Akif
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22d3ee', boxShadow: '0 0 6px #22d3ee' }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.15)' }}>
              PORTFOLIO
            </span>
          </div>
          <div className="absolute bottom-6 right-6">
            <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.1)' }}>
              2026
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
