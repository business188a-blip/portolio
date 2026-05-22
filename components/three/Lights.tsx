'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Lights() {
  const pointRef1 = useRef<THREE.PointLight>(null)
  const pointRef2 = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (pointRef1.current) {
      pointRef1.current.position.x = Math.sin(t * 0.3) * 5
      pointRef1.current.position.y = Math.cos(t * 0.2) * 3
    }
    if (pointRef2.current) {
      pointRef2.current.position.x = Math.cos(t * 0.25) * 5
      pointRef2.current.position.y = Math.sin(t * 0.35) * 3
    }
  })

  return (
    <>
      {/* Deep ambient — very dark */}
      <ambientLight intensity={0.05} color="#050510" />

      {/* Cyan key light */}
      <pointLight
        ref={pointRef1}
        position={[4, 2, 3]}
        intensity={4}
        color="#22d3ee"
        distance={15}
        decay={2}
      />

      {/* Violet fill light */}
      <pointLight
        ref={pointRef2}
        position={[-4, -2, 2]}
        intensity={3}
        color="#a78bfa"
        distance={15}
        decay={2}
      />

      {/* White rim */}
      <pointLight
        position={[0, 5, -5]}
        intensity={1}
        color="#ffffff"
        distance={20}
        decay={2}
      />
    </>
  )
}
