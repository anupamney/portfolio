'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import styles from './HeroSection.module.scss';

// Pre-computed values to avoid hydration mismatch
const particleData = Array.from({ length: 40 }).map((_, i) => ({
  width: (i % 8) + 2,
  height: (i % 8) + 2,
  background: i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : 'rgba(255,255,255,0.3)',
  opacity: 0.1 + (i % 10) * 0.05,
  top: (i * 2.5) % 100,
  left: (i * 3.2) % 100,
  yMovement: -((i % 10) * 10 + 50),
  xMovement: (i % 20) - 10,
  duration: (i % 10) + 15,
  delay: (i % 5),
}));

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

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

  // Add scroll event listener to detect when user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);

  return (
    <section
      id="home"
      className={styles.heroSection}
      ref={containerRef}
    >
      {/* Background elements */}
      <div className={styles.backgroundGradients}>
        <motion.div 
          className={styles.blueGlow}
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
          className={styles.purpleGlow}
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
        
        <motion.div 
          className={styles.whiteGlow}
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
      </div>
      
      {/* Dark overlay gradient */}
      <div className={styles.darkOverlay}></div>
      
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            style={{
              width: particle.width + 'px',
              height: particle.height + 'px',
              background: particle.background,
              opacity: particle.opacity,
              top: particle.top + '%',
              left: particle.left + '%',
            }}
            animate={{
              y: [0, particle.yMovement, 0],
              x: [0, particle.xMovement, 0],
              opacity: [0.1, particle.opacity, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "loop",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <motion.div
        className={styles.container}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.3,
            }
          }
        }}
      >
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>
            <motion.h1 
              className={styles.heroTitle}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
                }
              }}
              ref={titleRef}
            >
              Building <span className={styles.highlight}>Digital Experiences</span> That Matter
            </motion.h1>
          </div>
          
          <motion.p
            className={styles.subtitle}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.2 }
              }
            }}
          >
            Full Stack Developer crafting beautiful, functional & performant web applications
          </motion.p>
          
          <motion.div
            className={styles.ctaContainer}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1], delay: 0.4 }
              }
            }}
          >
            <a
              href="#projects"
              className={styles.primaryButton}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className={styles.secondaryButton}
            >
              Contact Me
            </a>
          </motion.div>
        </div>
        
        {/* Scroll indicator with AnimatePresence for smooth exit */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              className={styles.scrollIndicator}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={styles.scrollText}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
              >
                Scroll
              </motion.div>
              
              <motion.div className={styles.scrollChevrons}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {/* Animated circle */}
                <motion.div 
                  className={styles.scrollCircle}
                  animate={{ scale: [0.9, 1.1, 0.9] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                />
                
                {/* Pulsing background */}
                <motion.div
                  className={styles.pulse}
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    repeatType: 'loop',
                    ease: "easeInOut"
                  }}
                />
                
                {/* Three chevron arrows with staggered animation */}
                <motion.div 
                  className={styles.chevron}
                  animate={{ 
                    y: [0, 8, 0],
                    opacity: [0, 1, 0],
                    scale: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: 'loop',
                    delay: 0
                  }}
                />
                
                <motion.div 
                  className={styles.chevron}
                  animate={{ 
                    y: [0, 8, 0],
                    opacity: [0, 1, 0],
                    scale: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: 'loop',
                    delay: 0.2
                  }}
                />
                
                <motion.div 
                  className={styles.chevron}
                  animate={{ 
                    y: [0, 8, 0],
                    opacity: [0, 1, 0],
                    scale: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatType: 'loop',
                    delay: 0.4
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
} 