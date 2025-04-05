"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, BookOpen, Award, Zap } from "lucide-react"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-red-500" />,
      title: "Interactive Courses",
      description: "Engaging Web3 content with hands-on projects and real-world applications.",
    },
    {
      icon: <Users className="w-8 h-8 text-red-500" />,
      title: "Community Learning",
      description: "Connect with peers, mentors, and industry experts in a collaborative environment.",
    },
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      title: "Earn Credentials",
      description: "Receive NFT certificates and badges that verify your skills on-chain.",
    },
    {
      icon: <Zap className="w-8 h-8 text-red-500" />,
      title: "Learn-to-Earn",
      description: "Earn tokens by completing courses, contributing content, and helping others.",
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <section id="about" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-red-500">Kuroro</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Kuroro is revolutionizing Web3 education through collaborative learning, cutting-edge technology, and
            incentivized participation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
              <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -10 }}
              className="bg-slate-900/40 hover:bg-slate-800/60 hover:shadow-lg backdrop-blur-sm p-8 rounded-2xl border border-white/10 transition-all duration-300"
            >
              <div className="mb-5 p-3 inline-block bg-slate-800/50 rounded-xl">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>          
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Join over 50,000 learners from 120+ countries who are building the future of Web3 together.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

