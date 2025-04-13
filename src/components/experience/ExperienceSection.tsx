'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ExperienceSection.module.scss';

// Experience data
const experiences = [
  {
    id: 1,
    role: 'Lead Software Engineer',
    company: 'Mindbody Inc.',
    location: 'Pune, India',
    period: 'Feb 2024 – Present',
    description: 'Leading frontend development and architecture decisions for analytics products.',
    technologies: ['React.js', 'Next.js', 'C#', '.NET', 'Aurora Postgres'],
    achievements: [
      'Delivered a template management system for the Analytics Dashboard, saving 50+ engineering hours weekly.',
      'Engineered FastContext, reducing re-renders by 40% and improving application performance.',
      'Developed an npm package for migrating standalone MFEs to Next.js Monorepos.',
      'Redesigned the Analytics Dashboard, increasing the System Usability Scale (SUS) Score by 2.2%.'
    ]
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'Mindbody Inc.',
    location: 'Pune, India',
    period: 'June 2022 – Jan 2024',
    description: 'Developed and maintained frontend and backend components for business reporting features.',
    technologies: ['React.js', 'C# .NET', 'VB .NET', 'SQL Server'],
    achievements: [
      'Developed a Proof of Concept (POC) for an Analytics Dashboard using Looker.',
      'Created a new Reports Homepage, increasing user engagement by 1.3%.',
      'Managed release processes and incident management using New Relic.'
    ]
  },
  {
    id: 3,
    role: 'Associate Software Engineer Intern',
    company: 'Mindbody Inc.',
    location: 'Pune, India',
    period: 'Jan 2022 – May 2022',
    description: 'Contributed to frontend and backend development for business management software.',
    technologies: ['React', 'C#', '.NET', 'Xunit', 'Jest'],
    achievements: [
      'Created the frontend of the "no-show late-cancel" feature, increasing customer onboarding rate by 4%.',
      'Added behavioral and unit tests for backend services.'
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <section id="experience" className={styles.section}>
      {/* Background gradients */}
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      
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
            Work <span className={styles.highlight}>Experience</span>
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
          <motion.p
            className={styles.subTitle}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
            }}
          >
            My professional journey and accomplishments
          </motion.p>
        </div>
        
        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className={styles.timelineItem}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { 
                    duration: 0.6,
                    delay: index * 0.2,
                    ease: [0.215, 0.61, 0.355, 1]
                  } 
                }
              }}
            >
              <div className={styles.timelineDot} />
              
              <div className={styles.card}>
                <div className={styles.date}>{exp.period}</div>
                <h3 className={styles.role}>{exp.role}</h3>
                <div className={styles.company}>{exp.company} • {exp.location}</div>
                <p className={styles.description}>{exp.description}</p>
                
                <div className={styles.technologies}>
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className={styles.tech}>{tech}</span>
                  ))}
                </div>
                
                <div className={styles.achievements}>
                  <div className={styles.achievementTitle}>Key Achievements</div>
                  <ul>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 