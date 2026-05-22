'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { lerp } from '@/lib/utils'

interface CameraRigProps {
  children: React.ReactNode
}

export default function CameraRig({ children }: CameraRigProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const { camera } = useThree()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Smooth mouse tracking
    target.current.x = lerp(target.current.x, mouse.current.x * 0.5, 0.04)
    target.current.y = lerp(target.current.y, mouse.current.y * 0.3, 0.04)

    // Apply to group (scene parallax)
    if (groupRef.current) {
      groupRef.current.rotation.y = target.current.x * 0.2
      groupRef.current.rotation.x = target.current.y * 0.15
    }

    // Subtle breathing camera
    camera.position.z = 8 + Math.sin(t * 0.3) * 0.3
    camera.position.y = Math.sin(t * 0.2) * 0.2
  })

  return <group ref={groupRef}>{children}</group>
}
