"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"

import Navbar from "./navbar"
import HeroSection from "./hero-section"
import AboutSection from "./about-section"
import LearnSection from "./learn-section"
import DaoSection from "./dao-section"
import FooterSection from "./footer-section"
import LoadingScreen from "./loading-screen"
import { FloatingElements } from "./floating-elements"
import { NetworkBackground } from "./network-background"

export default function KuroroLanding() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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
      <div className="fixed inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <Environment preset="night" />
            <NetworkBackground scrollProgress={scrollY} />
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

