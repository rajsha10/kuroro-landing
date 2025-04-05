"use client"

import { motion } from "framer-motion"
import { Twitter, Github, DiscIcon as Discord, Linkedin } from "lucide-react"

export default function FooterSection() {
  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Discord className="w-5 h-5" />, href: "#", label: "Discord" },
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ]

  const footerLinks = [
    { title: "Platform", links: ["Courses", "Roadmaps", "Pricing", "FAQ"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Resources", links: ["Documentation", "Tutorials", "Guides", "API"] },
    { title: "Legal", links: ["Privacy", "Terms", "Cookies", "Licenses"] },
  ]

  return (
    <footer id="community" className="pt-24 pb-12 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-white">
                <span className="text-red-500">K</span>uroro
              </h2>
              <p className="text-white/70 mt-4 max-w-md">
                Revolutionizing Web3 education through collaborative learning, cutting-edge technology, and incentivized
                participation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {footerLinks.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 2) }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/50 text-sm">© {new Date().getFullYear()} Kuroro. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p className="text-white/50 text-sm">Powered by Web3 Technology</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

