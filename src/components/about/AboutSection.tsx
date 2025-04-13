'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollTriggerAnimation } from '@/lib/animations/gsap-animations';
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
                <img
                  src="/profile.jpg"
                  alt="Anupam Shandilya"
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
              Lead Software Engineer based in <span className={styles.highlight}>Pune, India</span>
            </h3>
            
            <p className={styles.contentText}>
              I&apos;m a Lead Software Engineer at Mindbody Inc. with expertise in React.js, Next.js, 
              TypeScript, C#, and .NET. I specialize in building high-performance web applications 
              and delivering solutions that enhance user experience and productivity.
            </p>
            
            <p className={styles.contentText}>
              With a proven track record of improving application performance by up to 40% and developing 
              innovative solutions, I&apos;ve delivered impactful projects that have increased 
              system usability and reduced development time. My competitive programming 
              background has sharpened my problem-solving skills, achieving a global rank 
              of 32 in Leetcode contests and maintaining a rating of 2,280.
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