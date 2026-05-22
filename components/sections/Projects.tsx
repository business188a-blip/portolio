'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 'silentnote',
    title: 'SilentNote',
    tagline: 'Offline AI meeting minutes generator',
    description:
      'Fully offline meeting intelligence system using OpenAI Whisper for transcription and spaCy for NLP extraction. Generates structured minutes without any API dependency — runs entirely on device.',
    stack: ['Python', 'Whisper', 'spaCy', 'PyQt6'],
    accent: 'cyan',
    badge: 'FYP',
    link: 'https://github.com/business188a-blip',
  },
  {
    id: 'nanowork',
    title: 'NanoWork',
    tagline: 'Micro-task agent platform with USDC nanopayments',
    description:
      "AI sub-agents complete micro-tasks and receive real USDC payments via Circle's Nanopayments API and Arc testnet. Built solo during the Agentic Economy on Arc hackathon.",
    stack: ['FastAPI', 'Next.js', 'Gemini API', 'Circle SDK'],
    accent: 'violet',
    badge: 'Hackathon',
    link: 'https://github.com/business188a-blip',
  },
  {
    id: 'companioai',
    title: 'CompanioAI',
    tagline: 'Bilingual voice assistant',
    description:
      'Real-time bilingual voice assistant supporting English and Urdu. Built with speech recognition, TTS synthesis, and conversational AI orchestration.',
    stack: ['Python', 'SpeechRecognition', 'pyttsx3', 'OpenAI'],
    accent: 'cyan',
    link: 'https://github.com/business188a-blip',
  },
  {
    id: 'blood-donation',
    title: 'Blood Donation Network',
    tagline: 'Serverless AWS platform',
    description:
      'Production serverless web app connecting donors with recipients. Full AWS stack: Lambda functions, DynamoDB, S3, API Gateway, Cognito auth.',
    stack: ['AWS Lambda', 'DynamoDB', 'S3', 'API Gateway'],
    accent: 'violet',
    link: 'https://github.com/business188a-blip',
  },
  {
    id: 'faceguard',
    title: 'FaceGuard',
    tagline: 'Real-time face recognition system',
    description:
      'Computer vision system for real-time face detection and recognition. Built with OpenCV and DeepFace for attendance and access control use cases.',
    stack: ['Python', 'OpenCV', 'DeepFace', 'SQLite'],
    accent: 'cyan',
    link: 'https://github.com/business188a-blip',
  },
  {
    id: 'clinicsync',
    title: 'ClinicSync360',
    tagline: 'Healthcare management app',
    description:
      'Cross-platform React Native app for clinic management — patient records, appointments, billing, and reporting in one system.',
    stack: ['React Native', 'Node.js', 'PostgreSQL'],
    accent: 'violet',
    link: 'https://github.com/business188a-blip',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
        }
      )

      // Cards — scale and fade in with stagger
      const cards = gridRef.current?.querySelectorAll('.project-card') ?? []
      gsap.fromTo(cards,
        { scale: 0.88, opacity: 0, y: 50 },
        {
          scale: 1, opacity: 1, y: 0,
          duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6">
      <div
        className="orb w-[600px] h-[600px] top-1/2 left-0 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="mb-16">
          <span className="font-mono text-xs tracking-widest" style={{ color: '#a78bfa' }}>
            02 / PROJECTS
          </span>
          <h2
            className="font-display font-light mt-2 mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'rgba(255,255,255,0.9)' }}
          >
            What I've Built
          </h2>
          <p className="font-body" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '40ch' }}>
            Each project shipped end-to-end. No isolated tutorials — real systems built to solve real problems.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div key={project.id} className="project-card">
              <GlassCard
                glow={project.accent as 'cyan' | 'violet'}
                className="h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className="font-display text-2xl font-light"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                      >
                        {project.title}
                      </h3>
                      {project.badge && (
                        <span
                          className="px-2 py-0.5 rounded text-xs font-mono"
                          style={{
                            background: project.accent === 'cyan'
                              ? 'rgba(34,211,238,0.12)'
                              : 'rgba(167,139,250,0.12)',
                            color: project.accent === 'cyan' ? '#22d3ee' : '#a78bfa',
                            border: `1px solid ${project.accent === 'cyan'
                              ? 'rgba(34,211,238,0.2)'
                              : 'rgba(167,139,250,0.2)'}`,
                          }}
                        >
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className="font-mono text-xs tracking-wider"
                      style={{ color: project.accent === 'cyan' ? '#22d3ee' : '#a78bfa' }}
                    >
                      {project.tagline}
                    </p>
                  </div>
                  <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    0{i + 1}
                  </span>
                </div>

                <p
                  className="font-body text-sm leading-relaxed mb-5 flex-1"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <GlassButton href={project.link} variant="ghost" external className="self-start text-xs px-4 py-2">
                  View on GitHub ↗
                </GlassButton>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
