"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function LearnSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.2 })

  const courses = [
    {
      title: "Blockchain Fundamentals",
      level: "Beginner",
      modules: 12,
      students: "5.2K",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "Smart Contract Development",
      level: "Intermediate",
      modules: 8,
      students: "3.7K",
      image: "/placeholder.svg?height=200&width=350",
    },
    {
      title: "DeFi Protocols & Applications",
      level: "Advanced",
      modules: 10,
      students: "2.9K",
      image: "/placeholder.svg?height=200&width=350",
    },
  ]

  return (
    <section id="learn" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Learn, <span className="text-red-500">Earn</span>, Collaborate
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our interactive learning modules and start your Web3 journey today. Earn tokens and NFT credentials
            as you progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
              <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 * i }}
              whileHover={{ y: -15, scale: 1.05 }}
              className="bg-slate-900/40 hover:shadow-lg hover:bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transition-all duration-300"
            >
          
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-red-500/80 text-white text-sm rounded-full">{course.level}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">{course.title}</h3>
                <div className="flex justify-between text-white/70 mb-4">
                  <span>{course.modules} Modules</span>
                  <span>{course.students} Students</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                >
                  Explore Course
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
            }}
            className="px-8 py-3 bg-red-500 text-white rounded-full text-lg font-medium hover:bg-red-600 transition-all"
          >
            View All Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

