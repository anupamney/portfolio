'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollTriggerAnimation } from '@/lib/animations/gsap-animations';
import styles from './AboutSection.module.scss';

const statistics = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '99%', label: 'Client Satisfaction' },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run this effect in the browser, never during SSR
    if (typeof window === 'undefined') return;
    
    if (isInView && statsRef.current) {
      scrollTriggerAnimation('.stat-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        trigger: statsRef.current,
      });
    }
  }, [isInView]);

  return (
    <section id="about" className={styles.section}>
      {/* Background gradient elements */}
      <div className={styles.blueGradient} />
      <div className={styles.purpleGradient} />
      
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
          >
            About <span className={styles.highlight}>Me</span>
          </motion.h2>
          <motion.div 
            className={styles.divider}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: { width: "5rem", opacity: 1, transition: { duration: 0.6 } }
            }}
          />
        </div>
        
        <div className={styles.contentGrid}>
          {/* Image with animation */}
          <motion.div
            className={styles.imageContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0, 
                transition: { 
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1]
                } 
              }
            }}
          >
            <div className={styles.imageWrapper}>
              <div className={styles.innerContainer}>
                <img
                  src="/globe.svg"
                  alt="Developer Profile"
                  className={styles.image}
                  onError={(e) => {
                    // Fallback to a colored div if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite callbacks
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className={styles.decorativeBox1} />
            <div className={styles.decorativeBox2} />
          </motion.div>
          
          {/* Content */}
          <motion.div
            className={styles.contentContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0, 
                transition: { 
                  duration: 0.8,
                  ease: [0.215, 0.61, 0.355, 1]
                } 
              }
            }}
          >
            <h3 className={styles.contentHeading}>
              A passionate Full-Stack Developer based in <span className={styles.highlight}>Your Location</span>
            </h3>
            
            <p className={styles.contentText}>
              I design and develop services for customers of all sizes, specializing in creating
              stylish, modern websites, web services and online stores. My passion is to design
              digital user experiences through meaningful interactions. Check out my portfolio
              and see how I can help you.
            </p>
            
            <p className={styles.contentText}>
              I&apos;ve always been fascinated with the intersection of design and technology.
              My approach combines clean, efficient code with thoughtful UI/UX design to create
              solutions that are both functional and beautiful.
            </p>
            
            <div>
              <a
                href="#contact"
                className={styles.ctaButton}
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Stats */}
        <div
          className={styles.statsGrid}
          ref={statsRef}
        >
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className={`stat-item ${styles.statsCard}`}
            >
              <div className={styles.statsValue}>{stat.value}</div>
              <div className={styles.statsLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 