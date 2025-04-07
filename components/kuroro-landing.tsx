"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, useGLTF, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

import Navbar from "./navbar"
import HeroSection from "./hero-section"
import AboutSection from "./about-section"
import LearnSection from "./learn-section"
import DaoSection from "./dao-section"
import FooterSection from "./footer-section"
import LoadingScreen from "./loading-screen"
import { NetworkBackground } from "./network-background"

// GLTF Model component that follows scroll
const ScrollFollowModel = ({ url, scrollProgress }) => {
  const { scene, animations } = useGLTF(url)
  const mixer = useRef<THREE.AnimationMixer>()
  const modelRef = useRef<THREE.Group>()
  const [mouseX, setMouseX] = useState(0)
  const { viewport } = useThree()

  // Set up mouse move for horizontal rotation
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX((event.clientX / window.innerWidth) * 2 - 1)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Set up animation mixer and position model on the right
  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene)
      animations.forEach((clip) => {
        mixer.current?.clipAction(clip).play()
      })
    }

    if (scene) {
      modelRef.current = scene

      // Position model on the right side of the viewport
      scene.position.x = viewport.width * 0.25 // Position to the right

      // Auto-detect model dimensions and adjust scale
      const box = new THREE.Box3().setFromObject(scene)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)

      // Scale the model to be larger
      if (maxDim > 0) {
        const targetSize = 0.8 // Larger size (was 1 before)
        const scaleFactor = targetSize / maxDim
        scene.scale.multiplyScalar(scaleFactor)
      }
    }

    return () => {
      mixer.current?.stopAllAction()
    }
  }, [animations, scene, viewport])

  // Update animation, rotation and vertical position
  useFrame((state, delta) => {
    mixer.current?.update(delta)

    if (modelRef.current) {
      // Calculate vertical position based on scroll (moving from bottom to top as user scrolls)
      // Reduced the movement range to keep the model more visible
      const targetY = (0.2 - scrollProgress) * viewport.height * 0.05

      // Update vertical position with smooth transition
      modelRef.current.position.y = THREE.MathUtils.lerp(modelRef.current.position.y, targetY, 0.1)

      // Rotate based on mouse X position with faster response
      const targetRotation = Math.atan2(mouseX, 1)
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotation,
        0.5, // Increased from 0.1 for more responsive rotation
      )
    }
  })

  return <primitive ref={modelRef} object={scene} />
}

export default function KuroroLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const modelUrl = "/flying_robot/scene.gltf" // Replace with your actual model path

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY / (document.body.scrollHeight - window.innerHeight))
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div ref={containerRef} className="relative w-full bg-[#050A1F]">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-9999">
        <Canvas shadows camera={{ position: [4, 4, 10], fov: 10 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <NetworkBackground scrollProgress={scrollY} />
            <ScrollFollowModel url={modelUrl} scrollProgress={scrollY} />
            <OrbitControls enablePan={false} enableZoom={true} enableRotate={false} autoRotate={false} />
            {/* <FloatingElements scrollProgress={scrollY} /> */}
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <LearnSection />
        <DaoSection />
        <FooterSection />
      </div>
    </div>
  )
}

