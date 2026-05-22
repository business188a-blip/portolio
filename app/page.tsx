'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'

gsap.registerPlugin(ScrollTrigger)

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
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
    return () => { lenisRef.current?.destroy() }
  }, [])

  return (
    <main>
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
    </main>
  )
}