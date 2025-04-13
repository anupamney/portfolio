'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animations/motion-variants';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && titleRef.current) {
      const text = titleRef.current;
      
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        gsap.to(text, {
          duration: 0.5,
          x: x * 20,
          y: y * 20,
          ease: 'power2.out',
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111827 100%)' }}
      ref={containerRef}
    >
      {/* Background elements - animated gradient circles instead of 3D */}
      <motion.div 
        className="absolute left-1/4 top-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div 
        className="absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.25, 0.2],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Extra background gradient */}
      <motion.div 
        className="absolute left-1/2 bottom-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/20 via-[#0a0a0a]/60 to-[#0a0a0a] z-10"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 8 + 2 + 'px',
              height: Math.random() * 8 + 2 + 'px',
              background: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : 'rgba(255,255,255,0.3)',
              opacity: Math.random() * 0.5 + 0.1,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.1, Math.random() * 0.5 + 0.1, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20"
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariant}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#ededed] mb-6"
            variants={fadeUpVariant}
            ref={titleRef}
          >
            Building <span className="text-[#3b82f6]">Digital Experiences</span> That Matter
          </motion.h1>
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#ededed]/80 mb-10 max-w-2xl mx-auto"
            variants={fadeUpVariant}
          >
            Full Stack Developer crafting beautiful, functional & performant web applications
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeUpVariant}
          >
            <a
              href="#projects"
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="bg-[#1f2937] hover:bg-[#374151] text-[#f3f4f6] px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="flex flex-col items-center">
            <span className="text-[#ededed]/60 text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-[#ededed]/20 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1 h-1.5 bg-[#3b82f6] rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 