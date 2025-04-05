"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import '../components/fonts.css';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  href,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  href: string;
}) => {
  return (
    <motion.a
      href={href}
      onMouseEnter={() => setActive(item)}
      className="relative text-white hover:text-red-400 transition-colors px-2 py-1"
      whileHover={{ y: -2 }}
    >
      {item}
      {active !== null && (
        <AnimatePresence>
          {active === item && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute inset-x-0 w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-red-500 to-transparent h-px"
            />
          )}
        </AnimatePresence>
      )}
    </motion.a>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-[#050A1F]/90 backdrop-blur-md shadow-input flex items-center justify-center space-x-4 px-4 py-2 overflow-x-auto max-w-full"
    >
      {children}
    </motion.nav>
  );
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Learn", link: "#learn" },
    { name: "DAO", link: "#dao" },
    { name: "Community", link: "#community" },
  ];

  return (
    <>
      {/* Main Navbar (only visible when at top) */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-4 bg-transparent"
          >
            <div className="container mx-auto flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.2 }} className="text-2xl font-bold text-white cursor-pointer">
                <span className="text-red-500 text-2xl">黒</span>子
              </motion.div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <Menu setActive={setActive}>
                  <div className="flex items-center space-x-4"
                  style={ {fontFamily: 'Bungee Tint'} }>
                    {navItems.map((item) => (
                      <MenuItem
                        key={item.name}
                        setActive={setActive}
                        active={active}
                        item={item.name}
                        href={item.link}
                      />
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="ml-2 px-4 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-colors"
                    >
                      Join Now
                    </motion.button>
                  </div>
                </Menu>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
                  {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>
              </div>
            </div>
            
            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-[#050A1F]/95 backdrop-blur-md mt-4 rounded-lg overflow-hidden"
                >
                  <div className="flex flex-col py-4 px-6 space-y-2"
                  style={ {fontFamily: 'Bungee Tint'} }>
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.link}
                        className="text-white hover:text-red-400 transition-colors py-2 bungee-tint-regular"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                    <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors w-full md:w-auto">
                      Join Now
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation (only appears when scrolled) */}
      <AnimatePresence mode="wait">
        {isScrolled && (
          <motion.div
            initial={{
              opacity: 0,
              y: -100,
            }}
            animate={{
              y: visible ? 0 : -100,
              opacity: visible ? 1 : 0,
            }}
            exit={{
              opacity: 0,
              y: -100,
            }}
            transition={{
              duration: 0.2,
            }}
            className={cn(
              "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-[#050A1F]/90 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-50 py-2 px-4"
            )}
          >
            <div className="mr-4 text-lg font-bold text-white">
              <span className="text-red-500 reggae-one-regular">黒</span>子
            </div>
            <div className="overflow-x-auto flex items-center"
            style={ {fontFamily: "Reggae One", fontSize: '12px'} }>
              {navItems.map((navItem, idx) => (
                <a
                  key={`floating-link-${idx}`}
                  href={navItem.link}
                  className="relative text-white hover:text-red-400 transition-colors px-3 whitespace-nowrap"
                  onMouseEnter={() => setActive(navItem.name)}
                  onMouseLeave={() => setActive(null)}
                >
                  {navItem.name}
                  {active === navItem.name && (
                    <span className="absolute inset-x-0 w-full mx-auto -bottom-px bg-gradient-to-r from-transparent via-red-500 to-transparent h-px" />
                  )}
                </a>
              ))}
              <button className="ml-2 border text-sm font-medium whitespace-nowrap border-white/[0.2] text-white px-3 py-1 rounded-full hover:bg-red-500 hover:border-red-500 transition-colors">
                Join Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}