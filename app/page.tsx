'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import LoadingScreen from '@/components/ui/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef<any>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleLoadComplete = () => {
    setLoaded(true)
    // Reveal main content
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      )
    }
  }

  useEffect(() => {
    if (!loaded) return

    // Lenis + GSAP sync
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => { lenis.raf(time * 1000) })
      gsap.ticker.lagSmoothing(0)
    }
    initLenis()

    // Custom cursor
    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX - 4, y: mouseY - 4, duration: 0.1 })
    }

    const animate = () => {
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      gsap.set(cursor, { x: curX - 16, y: curY - 16 })
      requestAnimationFrame(animate)
    }

    const onEnterLink = () => gsap.to(cursor, { scale: 2, opacity: 0.6, duration: 0.3 })
    const onLeaveLink = () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })

    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    animate()

    return () => {
      lenisRef.current?.destroy()
      window.removeEventListener('mousemove', onMove)
    }
  }, [loaded])

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      <div ref={mainRef} style={{ opacity: 0 }}>
        {/* Custom cursor */}
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{ border: '1px solid rgba(34,211,238,0.5)', mixBlendMode: 'difference' }}
        />
        <div
          ref={cursorDotRef}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block"
          style={{ background: '#22d3ee' }}
        />

        {/* Floating light blobs */}
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="blob w-[500px] h-[500px] top-[-100px] left-[-100px]"
            style={{ background: 'rgba(34,211,238,0.04)' }} />
          <div className="blob blob-2 w-[400px] h-[400px] top-[30%] right-[-80px]"
            style={{ background: 'rgba(167,139,250,0.05)' }} />
          <div className="blob blob-3 w-[600px] h-[600px] bottom-[-150px] left-[30%]"
            style={{ background: 'rgba(34,211,238,0.03)' }} />
        </div>

        {/* 3D World */}
        <div className="canvas-container" style={{ pointerEvents: 'none' }}>
          <Scene />
        </div>

        {/* UI Layer */}
        <div className="content-layer">
          <Navbar />
          <Hero />
          <div className="section-divider" />
          <About />
          <div className="section-divider" />
          <Projects />
          <div className="section-divider" />
          <Experience />
          <div className="section-divider" />
          <Contact />
        </div>
      </div>
    </>
  )
}
