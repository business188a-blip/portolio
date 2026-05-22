'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '@/components/ui/GlassCard'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    period: '2023 — Present',
    role: 'Founder & Lead Developer',
    org: 'Zaiham IT Agency',
    type: 'Entrepreneurship',
    accent: 'cyan',
    highlights: [
      'Built AI workflow automation and Python SaaS products for international clients',
      'Active on Upwork and Sikaty with tiered service packages',
      'End-to-end delivery: scoping, building, deploying',
    ],
  },
  {
    period: 'April 2026',
    role: 'Solo Hackathon Builder',
    org: 'Agentic Economy on Arc',
    type: 'Hackathon',
    accent: 'violet',
    highlights: [
      'Built NanoWork — AI micro-task platform with real USDC nanopayments',
      'Solo entry: FastAPI backend, Next.js frontend, Circle SDK, Gemini API',
      'Arc testnet integration for real blockchain transactions',
    ],
  },
  {
    period: '2022 — 2026',
    role: 'CS Final Year Student',
    org: 'GCUF — Govt. College University, Faisalabad',
    type: 'Education',
    accent: 'cyan',
    highlights: [
      'Final Year Project: SilentNote — fully offline AI meeting minutes generator',
      'Studied AI, distributed systems, cybersecurity, and software engineering',
      'Academic defence: June 1, 2026',
    ],
  },
  {
    period: '2023',
    role: 'AWS Certified Developer',
    org: 'Amazon Web Services',
    type: 'Certification',
    accent: 'violet',
    highlights: [
      'Serverless architecture with Lambda, DynamoDB, API Gateway',
      'Applied to Blood Donation Network — production AWS app',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        }
      )

      // Timeline line draws down
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
        }
      )

      // Each timeline card slides in from left with stagger
      const cards = timelineRef.current?.querySelectorAll('.timeline-card') ?? []
      gsap.fromTo(cards,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8, ease: 'power3.out', stagger: 0.18,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
        }
      )

      // Dots pulse in
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot') ?? []
      gsap.fromTo(dots,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5, ease: 'back.out(2)', stagger: 0.18,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%', once: true },
          delay: 0.3,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6">
      <div
        className="orb w-[400px] h-[400px] bottom-0 right-0"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <span className="font-mono text-xs tracking-widest" style={{ color: '#22d3ee' }}>
            03 / EXPERIENCE
          </span>
          <h2
            className="font-display font-light mt-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'rgba(255,255,255,0.9)' }}
          >
            Journey So Far
          </h2>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #22d3ee, #a78bfa, transparent)' }}
          />

          <div className="space-y-6 md:pl-10">
            {timeline.map((item, i) => (
              <div key={item.org} className="timeline-card relative">
                {/* Dot */}
                <div
                  className="timeline-dot absolute -left-12 top-5 w-2.5 h-2.5 rounded-full hidden md:block"
                  style={{
                    background: item.accent === 'cyan' ? '#22d3ee' : '#a78bfa',
                    boxShadow: `0 0 10px ${item.accent === 'cyan'
                      ? 'rgba(34,211,238,0.5)'
                      : 'rgba(167,139,250,0.5)'}`,
                  }}
                />

                <GlassCard tilt={false}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <span
                        className="font-mono text-xs tracking-widest mb-1 block"
                        style={{ color: item.accent === 'cyan' ? '#22d3ee' : '#a78bfa' }}
                      >
                        {item.type}
                      </span>
                      <h3
                        className="font-display text-xl font-light"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                      >
                        {item.role}
                      </h3>
                      <p className="font-body text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {item.org}
                      </p>
                    </div>
                    <span
                      className="font-mono text-xs whitespace-nowrap"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      {item.period}
                    </span>
                  </div>

                  <ul className="space-y-1.5">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="font-body text-sm leading-relaxed flex items-start gap-2"
                        style={{ color: 'rgba(255,255,255,0.5)' }}
                      >
                        <span style={{ color: item.accent === 'cyan' ? '#22d3ee' : '#a78bfa' }}>›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
