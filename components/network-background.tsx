"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface NetworkBackgroundProps {
  scrollProgress: number
}

export function NetworkBackground({ scrollProgress }: NetworkBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // Generate random points
  const { positions, indices } = useMemo(() => {
    const positions = []
    const indices = []
    const count = 200

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 30
      const y = (Math.random() - 0.5) * 30
      const z = (Math.random() - 0.5) * 30 - 10

      positions.push(x, y, z)

      // Connect some points with lines
      if (i > 0 && Math.random() > 0.7) {
        const prevIndex = Math.floor(Math.random() * i)
        indices.push(i, prevIndex)
      }
    }

    return { positions, indices }
  }, [])

  const pointsGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    return geometry
  }, [positions])

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setIndex(indices)
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    return geometry
  }, [positions, indices])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = clock.getElapsedTime() * 0.05
      linesRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1
    }
  })

  return (
    <group position={[0, 0, -5 - scrollProgress * 10]}>
      <points ref={pointsRef}>
        <primitive object={pointsGeometry} />
        <pointsMaterial size={0.1} color="#ef4444" sizeAttenuation transparent opacity={0.8} />
      </points>

      <lineSegments ref={linesRef}>
        <primitive object={linesGeometry} />
        <lineBasicMaterial color="#ef4444" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

