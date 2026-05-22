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

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    initLenis()

    return () => {
      lenisRef.current?.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return (
    <main>
      {/* 3D World — fixed behind everything */}
      <div className="canvas-container" style={{ pointerEvents: 'none' }}>
        <Scene />
      </div>

      {/* UI Layer */}
      <div className="content-layer">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </main>
  )
}
