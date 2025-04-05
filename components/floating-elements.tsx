"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import type * as THREE from "three"

interface FloatingElementsProps {
  scrollProgress: number
}

export function FloatingElements({ scrollProgress }: FloatingElementsProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating Cubes */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[3, -2 + scrollProgress * 5, -5]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[-4, 2 - scrollProgress * 3, -6]} rotation={[0.2, 0.3, 0.4]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
        </mesh>
      </Float>

      {/* Floating Spheres */}
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <mesh position={[5, 3 + scrollProgress * 2, -8]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.2} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh position={[-3, -3 - scrollProgress * 4, -7]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>

      {/* Floating Torus */}
      <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[4, 0 + scrollProgress * 3, -9]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <meshStandardMaterial color="#ef4444" metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>

      {/* Floating Torus Knot */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh position={[-5, 4 - scrollProgress * 2, -10]}>
          <torusKnotGeometry args={[0.5, 0.15, 64, 8]} />
          <meshStandardMaterial color="#ffffff" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

