'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '@/components/ui/GlassCard'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '3+', label: 'Years Building', accent: 'cyan' },
  { value: '15+', label: 'Projects Shipped', accent: 'violet' },
  { value: 'AWS', label: 'Certified', accent: 'cyan' },
  { value: 'CS', label: 'GCUF Graduate', accent: 'violet' },
]

const skills = [
  { group: 'AI / LLM', items: ['Python', 'LangChain', 'Whisper', 'spaCy', 'Gemini', 'FastAPI'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'React Native', 'TypeScript', 'Tailwind'] },
  { group: 'Backend', items: ['FastAPI', '.NET Core', 'PostgreSQL', 'SQLite', 'REST'] },
  { group: 'Cloud', items: ['AWS Lambda', 'DynamoDB', 'S3', 'Vercel', 'Docker'] },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slides in from left
      gsap.fromTo(headingRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        }
      )

      // Bio paragraphs stagger up
      gsap.fromTo(bioRef.current?.querySelectorAll('p') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: bioRef.current, start: 'top 80%', once: true },
        }
      )

      // Stat cards pop in with scale
      gsap.fromTo(statsRef.current?.querySelectorAll('.stat-card') ?? [],
        { scale: 0.85, opacity: 0, y: 20 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', once: true },
        }
      )

      // Skill rows slide in from right
      gsap.fromTo(skillsRef.current?.querySelectorAll('.skill-row') ?? [],
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: skillsRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      <div
        className="orb w-[500px] h-[500px] top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <span className="font-mono text-xs tracking-widest" style={{ color: '#22d3ee' }}>
            01 / ABOUT
          </span>
          <h2
            className="font-display font-light mt-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'rgba(255,255,255,0.9)' }}
          >
            Who I Am
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio + Stats */}
          <div className="space-y-6">
            <div ref={bioRef} className="space-y-6">
              <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                I'm an AI Systems Developer and founder of{' '}
                <span style={{ color: '#22d3ee' }}>Zaiham IT Agency</span>, based in
                Faisalabad, Pakistan. I build intelligent automation systems, LLM-powered
                tools, and production-grade software that solves real problems.
              </p>
              <p className="font-body text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                My flagship project{' '}
                <span style={{ color: '#a78bfa' }}>SilentNote</span> — an offline meeting
                minutes generator using Whisper and spaCy — reflects my obsession with
                practical AI that works without internet dependency.
              </p>
              <p className="font-body leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                AWS Certified · Final-year CS at GCUF · Open to remote roles globally.
              </p>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <GlassCard className="text-center py-5" tilt={false}>
                    <div
                      className="font-display text-3xl font-light mb-1"
                      style={{ color: stat.accent === 'cyan' ? '#22d3ee' : '#a78bfa' }}
                    >
                      {stat.value}
                    </div>
                    <div className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {stat.label}
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div ref={skillsRef} className="space-y-4">
            {skills.map((group, i) => (
              <div key={group.group} className="skill-row">
                <GlassCard glow="none" tilt={false}>
                  <div className="flex items-start gap-4">
                    <span
                      className="font-mono text-xs tracking-widest mt-1 shrink-0 w-20"
                      style={{ color: i % 2 === 0 ? '#22d3ee' : '#a78bfa' }}
                    >
                      {group.group}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-md text-xs font-mono"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.65)',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
