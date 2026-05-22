'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollFadeUp(selector: string, options?: {
  delay?: number
  stagger?: number
  start?: string
}) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: options?.stagger ?? 0.12,
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options?.start ?? 'top 80%',
            once: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [selector, options?.delay, options?.stagger, options?.start])

  return containerRef
}

export function useScrollReveal(options?: {
  start?: string
  onEnter?: () => void
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: options?.start ?? 'top 75%',
      once: true,
      onEnter: options?.onEnter,
    })

    return () => trigger.kill()
  }, [])

  return ref
}

export function useParallax(speed: number = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}
