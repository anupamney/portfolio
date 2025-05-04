'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollTriggerAnimation } from '@/lib/animations/gsap-animations';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import styles from './AboutSection.module.scss';

const statistics = [
  { value: '2+', label: 'Years Experience' },
  { value: '8+', label: 'Projects Completed' },
  { value: '2,280', label: 'Leetcode Rating', isHighlight: true },
  { value: '32', label: 'Contest Global Rank' },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run this effect in the browser, never during SSR
    if (typeof window === 'undefined') return;
    
    if (isInView && statsRef.current) {
      scrollTriggerAnimation('.stat-item', {
        y: 10, // Reduced from 20 to 10 for less aggressive animation
        opacity: 0.3, // Starting with some opacity instead of 0
        stagger: 0.08,
        duration: 0.6,
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
              visible: { width: "5rem", opacity: 1, transition: { duration: 0.5 } }
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
            <DotLottieReact
      src="https://lottie.host/d8d02246-b8e7-40cc-9acd-acedb0b0e46b/iMgvpASVRk.lottie"
      loop
      autoplay
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
              Lead Software Engineer based in <span className={styles.highlight}>Pune, India</span>
            </h3>
            
            <p className={styles.contentText}>
              I&apos;m Lead SDE 1 at Mindbody Inc., with deep expertise in React.js, 
              Next.js, TypeScript, C#, and .NET. I build high-performance web applications that 
              enhance user experience, boost productivity, and drive results.
            </p>
            
            <p className={styles.contentText}>
              I&apos;ve led initiatives that improved application performance by up to 40%, 
              streamlined development workflows, and delivered solutions that users love. 
              With a background in competitive programming — ranking 32nd globally in LeetCode 
              contests and achieving a peak rating of 2,280 — I bring sharp problem-solving 
              skills and a passion for clean, scalable software.
            </p>
            
            <div>
              <a
                href="#contact"
                className={styles.ctaButton}
              >
                Get In Touch
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
              className={`stat-item ${styles.statsCard} ${stat.isHighlight ? styles.highlightCard : ''}`}
            >
              <div className={`${styles.statsValue} ${stat.isHighlight ? styles.highlightValue : ''}`}>{stat.value}</div>
              <div className={styles.statsLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 