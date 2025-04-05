"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050A1F]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-5xl font-bold text-white">
          <span className="text-red-500">K</span>uroro
        </h1>
      </motion.div>

      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-red-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-4 text-white text-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading Web3 Experience...
      </motion.p>
    </div>
  )
}

