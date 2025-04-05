"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Users, Coins, Vote } from "lucide-react"

export default function DaoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })

  const daoFeatures = [
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "Governance",
      description: "Vote on platform features, course content, and treasury allocations.",
    },
    {
      icon: <Users className="w-6 h-6 text-red-500" />,
      title: "Community",
      description: "Connect with like-minded individuals and build your network.",
    },
    {
      icon: <Coins className="w-6 h-6 text-red-500" />,
      title: "Rewards",
      description: "Earn tokens for your contributions to the ecosystem.",
    },
    {
      icon: <Vote className="w-6 h-6 text-red-500" />,
      title: "Proposals",
      description: "Submit and review community proposals for platform improvements.",
    },
  ]

  return (
    <section id="dao" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Join the <span className="text-red-500">Kuroro DAO</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Become part of our decentralized autonomous organization and help shape the future of Web3 education.
              Kuroro DAO members collectively govern the platform, propose new features, and share in its success.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {daoFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
              }}
              className="px-8 py-3 bg-red-500 text-white rounded-full text-lg font-medium hover:bg-red-600 transition-all"
            >
              Join the DAO
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-red-900/30 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="w-32 h-32 rounded-full bg-red-500/20 mx-auto flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-red-500/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                          <Coins className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    KURORO Token
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-white/70 mb-6"
                  >
                    The governance token powering the Kuroro ecosystem
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex justify-center gap-4"
                  >
                    <div className="px-4 py-2 bg-slate-800/50 rounded-lg">
                      <p className="text-sm text-white/70">Current Price</p>
                      <p className="text-xl font-bold text-white">$2.45</p>
                    </div>
                    <div className="px-4 py-2 bg-slate-800/50 rounded-lg">
                      <p className="text-sm text-white/70">Market Cap</p>
                      <p className="text-xl font-bold text-white">$24.5M</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

