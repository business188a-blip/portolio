'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import CameraRig from './CameraRig'
import FloatingObjects from './FloatingObjects'
import Particles from './Particles'
import Lights from './Lights'

function PostFX({ degraded }: { degraded: boolean }) {
  if (degraded) return null
  return (
    <EffectComposer multisampling={0}>
      {/* Bloom — makes emissive surfaces glow */}
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      {/* Subtle chromatic aberration — sci-fi lens feel */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0}
      />
      {/* Vignette darkens edges — cinematic framing */}
      <Vignette
        offset={0.3}
        darkness={0.7}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  )
}

export default function Scene() {
  const [degraded, setDegraded] = useState(false)

  return (
    <Canvas
      gl={{
        antialias: !degraded,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent' }}
      dpr={[1, degraded ? 1 : 1.5]}
    >
      <Suspense fallback={null}>
        <PerformanceMonitor
          onDecline={() => setDegraded(true)}
          onIncline={() => setDegraded(false)}
        >
          <Lights />
          <CameraRig>
            <FloatingObjects />
          </CameraRig>
          <Particles />
          <PostFX degraded={degraded} />
        </PerformanceMonitor>
      </Suspense>
    </Canvas>
  )
}
