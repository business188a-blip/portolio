'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

gsap.registerPlugin(ScrollTrigger)

const links = [
  {
    label: 'Email',
    value: 'arslanakif@zaiham.xyz',
    href: 'mailto:arslanakif@zaiham.xyz',
    accent: 'cyan',
  },
  {
    label: 'GitHub',
    value: 'github.com/business188a-blip',
    href: 'https://github.com/business188a-blip',
    accent: 'violet',
  },
  {
    label: 'Website',
    value: 'zaiham.xyz',
    href: 'https://zaiham.xyz',
    accent: 'cyan',
  },
  {
    label: 'Upwork',
    value: 'Zaiham IT Agency',
    href: 'https://upwork.com',
    accent: 'violet',
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading scales up from slightly small
      gsap.fromTo(headingRef.current,
        { scale: 0.92, opacity: 0, y: 30 },
        {
          scale: 1, opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        }
      )

      // Card slides up
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
        }
      )

      // Contact link items stagger in
      const linkItems = cardRef.current?.querySelectorAll('.contact-link') ?? []
      gsap.fromTo(linkItems,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08,
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
          delay: 0.4,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText('arslanakif@zaiham.xyz')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6">
      <div
        className="orb w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, rgba(167,139,250,0.03) 50%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <div ref={headingRef}>
          <span className="font-mono text-xs tracking-widest" style={{ color: '#a78bfa' }}>
            04 / CONTACT
          </span>

          <h2
            className="font-display font-light mt-4 mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: 'rgba(255,255,255,0.9)' }}
          >
            Let's Build
            <br />
            <span className="gradient-text">Something Real</span>
          </h2>

          <p
            className="font-body text-lg mb-12 max-w-lg mx-auto leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Open to remote roles, freelance projects, and interesting collaborations.
            I scope before I quote — no surprises.
          </p>
        </div>

        <div ref={cardRef} className="max-w-2xl mx-auto">
          <GlassCard tilt={false} className="text-left">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = link.accent === 'cyan'
                      ? 'rgba(34,211,238,0.05)'
                      : 'rgba(167,139,250,0.05)'
                    el.style.borderColor = link.accent === 'cyan'
                      ? 'rgba(34,211,238,0.2)'
                      : 'rgba(167,139,250,0.2)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(255,255,255,0.02)'
                    el.style.borderColor = 'rgba(255,255,255,0.06)'
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: link.accent === 'cyan' ? '#22d3ee' : '#a78bfa',
                      boxShadow: `0 0 8px ${link.accent === 'cyan'
                        ? 'rgba(34,211,238,0.5)'
                        : 'rgba(167,139,250,0.5)'}`,
                    }}
                  />
                  <div>
                    <div className="font-mono text-xs tracking-wider" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {link.label}
                    </div>
                    <div className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {link.value}
                    </div>
                  </div>
                  <span
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>

            <div
              className="flex flex-col sm:flex-row gap-3 pt-4 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <GlassButton href="mailto:arslanakif@zaiham.xyz" variant="primary" className="flex-1 justify-center">
                Send Email
              </GlassButton>
              <GlassButton onClick={handleCopy} variant="secondary" className="flex-1 justify-center">
                {copied ? '✓ Copied!' : 'Copy Email'}
              </GlassButton>
            </div>
          </GlassCard>
        </div>

        <p
          className="mt-16 font-mono text-xs tracking-widest"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          Arslan Akif · Faisalabad, Pakistan · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  )
}
