'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 1200

export default function Particles() {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    const cyanColor = new THREE.Color('#22d3ee')
    const violetColor = new THREE.Color('#a78bfa')
    const whiteColor = new THREE.Color('#ffffff')

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Spread across a wide volume
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 20 - 5

      // Mix of cyan, violet, and white
      const rand = Math.random()
      const color =
        rand < 0.33 ? cyanColor : rand < 0.66 ? violetColor : whiteColor

      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.01
      meshRef.current.rotation.x = Math.sin(t * 0.005) * 0.05
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
