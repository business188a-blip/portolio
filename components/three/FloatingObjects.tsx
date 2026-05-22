'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function FloatingCrystal({
  position,
  rotation,
  scale = 1,
  color = '#22d3ee',
  speed = 1,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  scale?: number
  color?: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + t * 0.2
      meshRef.current.rotation.y = rotation[1] + t * 0.3
      meshRef.current.rotation.z = rotation[2] + t * 0.1
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={1.2}  // high — triggers bloom
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus({
  position,
  scale = 1,
  color = '#a78bfa',
  speed = 0.8,
}: {
  position: [number, number, number]
  scale?: number
  color?: string
  speed?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.25
    }
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.25, 16, 40]} />
        <meshStandardMaterial
          color={color}
          roughness={0.05}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.9}  // triggers bloom on rings
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  )
}

function WireframeSphere({
  position,
  scale = 1,
}: {
  position: [number, number, number]
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1
      meshRef.current.rotation.x = t * 0.05
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          wireframe
          transparent
          opacity={0.12}
          emissive="#22d3ee"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  )
}

// Small glowing core orb — pure emissive, max bloom trigger
function GlowOrb({
  position,
  color,
  scale = 0.15,
}: {
  position: [number, number, number]
  color: string
  scale?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 2 + Math.sin(t * 2) * 0.5
    }
  })

  return (
    <Float speed={1.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          roughness={0}
          metalness={0}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingObjects() {
  return (
    <group>
      {/* Primary crystals */}
      <FloatingCrystal position={[3.5, 0.5, -2]} rotation={[0.5, 0.3, 0.1]} scale={1.2} color="#22d3ee" speed={0.7} />
      <FloatingCrystal position={[-3.2, 1.2, -3]} rotation={[0.2, 0.8, 0.4]} scale={0.8} color="#a78bfa" speed={0.9} />
      <FloatingCrystal position={[1.5, -2.5, -1]} rotation={[0.9, 0.1, 0.7]} scale={0.5} color="#22d3ee" speed={1.2} />
      <FloatingCrystal position={[-2, -1.5, -4]} rotation={[0.3, 0.6, 0.2]} scale={1.0} color="#a78bfa" speed={0.6} />

      {/* Torus rings */}
      <FloatingTorus position={[4.5, -1.5, -5]} scale={1.4} color="#a78bfa" speed={0.6} />
      <FloatingTorus position={[-4, 2.5, -6]} scale={1.0} color="#22d3ee" speed={0.8} />

      {/* Wireframe background spheres */}
      <WireframeSphere position={[0, 0, -8]} scale={3} />
      <WireframeSphere position={[5, 3, -10]} scale={1.5} />

      {/* Tiny glowing orbs — pure bloom sources */}
      <GlowOrb position={[2, 1, 0]} color="#22d3ee" scale={0.12} />
      <GlowOrb position={[-2.5, -0.5, -1]} color="#a78bfa" scale={0.1} />
      <GlowOrb position={[0, 2.5, -2]} color="#22d3ee" scale={0.08} />
      <GlowOrb position={[-1, -2, 0]} color="#a78bfa" scale={0.09} />
    </group>
  )
}
