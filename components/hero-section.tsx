"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, AnimatePresence, useMotionTemplate, useAnimationFrame } from "framer-motion"
import { cn } from "@/lib/utils"
import '../components/fonts.css';
import GltfViewer from "./3d/GltfViewer"

const MovingBorder = ({
  children,
  duration = 3000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);
  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });
  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

const Button = ({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              "h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
};

const Hero: React.FC = () => {
  const text = "Learn with KURORO"
  const letters = text.split("")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Mouse position for interactive elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Refs for container dimensions
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Animated taglines
  const taglines = ["Unlock your potential", "Master new skills", "Join the future of learning", "Discover your path"]
  const [currentTagline, setCurrentTagline] = useState(0)

  // Create transforms with enhanced sensitivity for more dynamic movement
  const orbX = useTransform(mouseX, [-100, 100], [-80, 80])
  const orbY = useTransform(mouseY, [-100, 100], [-80, 80])

  // Particle positions with improved dynamics
  const particlePositionsRef = useRef(
    Array.from({ length: 30 }).map((_, i) => ({
      x: 0,
      y: 0,
      delay: Math.random() * 0.5, // Add random delay for more natural movement
      speed: Math.random() * 0.3 + 0.1, // Random speed factor for varied movement
      motionX: useMotionValue(0),
      motionY: useMotionValue(0),
    })),
  )

  const particlePositions = particlePositionsRef.current

  const particleOpacity = useTransform(mouseX, [0, window.innerWidth / 2, window.innerWidth], [0.2, 0.7, 0.2])
  const particleScale = useTransform(mouseY, [0, window.innerHeight / 2, window.innerHeight], [0.5, 1.8, 0.5])

  // Update container dimensions
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Enhanced mouse movement with improved dynamics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smooth mouse position updates
      const mouseXTarget = e.clientX
      const mouseYTarget = e.clientY

      // Gradually update mouse position for smoother effect
      mouseX.set(mouseXTarget)
      mouseY.set(mouseYTarget)

      // Update particle positions with varied speeds and delays for more dynamic movement
      particlePositions.forEach((position, i) => {
        const angle = (i / particlePositions.length) * Math.PI * 2
        const distance = 100 + i * 5

        // Create swirling effect around cursor with varied speeds
        setTimeout(() => {
          position.motionX.set(mouseXTarget + Math.cos(angle + e.clientX * 0.001) * distance * position.speed)
          position.motionY.set(mouseYTarget + Math.sin(angle + e.clientY * 0.001) * distance * position.speed)
        }, position.delay * 1000)
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, particlePositions])

  // Rotate through taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [taglines.length])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-between overflow-hidden"
      style={{ backgroundColor: "transparent" }}
    >
      {/* 3D Geometric grid background with reduced opacity for transparent effect */}
      <div className="absolute inset-0 w-full h-full">
        <svg className="w-full h-full opacity-10" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f0f0f0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines with wave effect */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.path
              key={`h-line-${i}`}
              d={`M 0 ${i * 30} Q 200 ${i * 30 + (i % 2 === 0 ? 50 : -50)}, 400 ${i * 30} T 800 ${i * 30}`}
              strokeWidth="0.5"
              stroke="url(#grid-gradient)"
              fill="none"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: 0.3,
                pathLength: 1,
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}

          {/* Vertical grid lines with wave effect */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.path
              key={`v-line-${i}`}
              d={`M ${i * 40} 0 Q ${i * 40 + (i % 2 === 0 ? 30 : -30)} 300, ${i * 40} 600`}
              strokeWidth="0.5"
              stroke="url(#grid-gradient)"
              fill="none"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: 0.3,
                pathLength: 1,
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </svg>
      </div>

      {/* Enhanced animated particles that follow mouse with more dynamic movement */}
      <div className="absolute inset-0 pointer-events-none">
        {particlePositions.map((position, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              x: position.motionX,
              y: position.motionY,
              opacity: particleOpacity,
              scale: particleScale,
              width: 2 + Math.random() * 4, // Varied sizes
              height: 2 + Math.random() * 4,
              background: `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`, // White transparent particles
              boxShadow: `0 0 ${5 + Math.random() * 10}px rgba(255, 255, 255, 0.6)`, // Glow effect
            }}
          />
        ))}
      </div>

      {/* Two-column layout container */}
      <div className="relative z-10 w-full h-full max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left column: Main hero content */}
        <div className="w-full md:w-1/2 text-left md:pr-8 mb-12 md:mb-0">
          {/* Interactive title text with Bungee Tint font */}
          <div className="flex mb-6">
            {letters.map((letter, index) => (
              <motion.span
                key={`letter-${index}`}
                className="text-7xl md:text-8xl font-bold text-white inline-block cursor-pointer bungee-tint-regular"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  scale: hoveredIndex === index ? 1.2 : 1,
                  color: hoveredIndex === index ? "#ffffff" : "#f8f8f8",
                  textShadow:
                    hoveredIndex === index ? "0 0 20px rgba(255, 255, 255, 0.8)" : "0 0 0px rgba(255, 255, 255, 0)",
                  y: hoveredIndex === index ? -10 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                style={{
                  fontFamily: "Stick",
                  WebkitTextStroke: "1px rgba(255,255,255,0.2)",
                  filter: hoveredIndex === index ? "drop-shadow(0 0 12px rgba(255, 255, 255, 0.8))" : "none",
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          {/* Animated tagline */}
          <div className="h-8 mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTagline}
                className="text-xl text-white font-light reggae-one-regular"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {taglines[currentTagline]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Explore button with moving border */}
          <Button
            as={motion.div}
            containerClassName="mb-4"
            borderClassName="bg-[radial-gradient(#0ea5e9_40%,transparent_60%)]"
            className="text-white bg-slate-900/[0.8] border-white/20 reggae-one-regular"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            duration={4000}
          >
            Explore Kuroro
          </Button>

          {/* Animated decorative elements */}
          <div className="mt-12">
            <motion.div
              className="flex gap-4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-2 h-2 rounded-full"
                  style={{ background: "rgba(255, 255, 255, 0.5)" }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right column: GltfViewer */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full h-full md:max-h-full flex items-center justify-center absolute">
            <GltfViewer url="./robot/scene.gltf" />
          </div>
        </div>
      </div>

      {/* Enhanced animated cursor follower with more dynamic effects */}
      <motion.div
        className="fixed w-24 h-24 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
    </div>
  )
}

export default Hero