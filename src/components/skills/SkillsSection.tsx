'use client';

import { useRef, useMemo, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './SkillsSection.module.scss';
import { FaReact, FaGitAlt, FaCode, FaCheckSquare, FaDatabase, FaJs, FaHtml5, FaWindows } from 'react-icons/fa';
import { DiMsqlServer } from 'react-icons/di';

const skills = [
  { name: 'React.js', icon: <FaReact />, level: 95 },
  { name: 'Next.js', icon: <FaReact />, level: 90 },
  { name: 'TypeScript', icon: <FaCode />, level: 90 },
  { name: 'JavaScript', icon: <FaJs />, level: 95 },
  { name: 'C#', icon: <FaCode />, level: 85 },
  { name: '.NET', icon: <FaWindows />, level: 85 },
  { name: 'SQL Server', icon: <DiMsqlServer />, level: 80 },
  { name: 'Aurora Postgres', icon: <FaDatabase />, level: 75 },
  { name: 'Jest', icon: <FaCheckSquare />, level: 85 },
  { name: 'Xunit', icon: <FaCheckSquare />, level: 80 },
  { name: 'Git', icon: <FaGitAlt />, level: 90 },
  { name: 'SQLite', icon: <FaDatabase />, level: 75 },
  { name: 'HTML/CSS', icon: <FaHtml5 />, level: 90 },
  { name: 'Algorithms', icon: <FaCode />, level: 95 },
  { name: 'Data Structures', icon: <FaCode />, level: 95 },
  { name: 'Specflow', icon: <FaDatabase />, level: 80 },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1, margin: "0px 0px -100px 0px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Memoize skill categories for better performance
  const skillCategories = useMemo(() => {
    return {
      frontend: skills.filter(s => ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS'].includes(s.name)),
      backend: skills.filter(s => ['C#', '.NET', 'SQL Server', 'Aurora Postgres', 'SQLite'].includes(s.name)),
      testing: skills.filter(s => ['Jest', 'Xunit', 'Specflow'].includes(s.name)),
      other: skills.filter(s => ['Git', 'Algorithms', 'Data Structures'].includes(s.name)),
    };
  }, []);  

  const staggerValues = {
      staggerChildren:  0.05,
      delayChildren: 0.1,
    }

  return (
    <section id="skills" className={styles.section}>
      {/* Background elements for visual interest */}
      <div className={styles.backgroundGradient} />
      <div className={styles.blueGlow} />
      <div className={styles.purpleGlow} />
      
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
            My <span className={styles.highlight}>Skills</span>
          </motion.h2>
          <div className={styles.divider} />
          <motion.p
            className={styles.description}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
            }}
          >
            A selection of technical skills and technologies I&apos;ve worked with
          </motion.p>          
        </div>
        
        <motion.div
          className={styles.skillsGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: staggerValues
            }
          }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className={`${styles.skillCard} ${
                hoveredSkill === skill.name 
                  ? styles.hovered
                  : styles.default
              }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className={styles.skillHeader}>
                <div className={`${styles.iconContainer} ${
                  hoveredSkill === skill.name
                    ? styles.hovered
                    : styles.default
                }`}>
                  <div className={styles.iconWrapper}>
                    <span className={styles.reactIcon} style={{ fontSize: '24px', color: 'currentColor' }}>
                      {skill.icon}
                    </span>
                  </div>
                </div>
                <h3 className={styles.skillName}>{skill.name}</h3>
              </div>
              
              <div className={styles.progressLabels}>
                <span className={styles.progressLabel}>Proficiency</span>
                <span className={`${styles.progressValue} ${
                  hoveredSkill === skill.name ? styles.hovered : styles.default
                }`}>
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Categories section */}
        <motion.div
          className={styles.categorySection}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } }
          }}
        >
          <div className={styles.categoryGrid}>
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <motion.div 
                key={category}
                className={styles.categoryCard}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIcon}>
                    {category === 'frontend' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    )}
                    {category === 'backend' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                        <line x1="6" y1="6" x2="6.01" y2="6"></line>
                        <line x1="6" y1="18" x2="6.01" y2="18"></line>
                      </svg>
                    )}
                    {category === 'devops' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 16 12 12 8 16"></polyline>
                        <line x1="12" y1="12" x2="12" y2="21"></line>
                        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                        <polyline points="16 16 12 12 8 16"></polyline>
                      </svg>
                    )}
                    {category === 'design' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                        <path d="M2 2l7.586 7.586"></path>
                        <circle cx="11" cy="11" r="2"></circle>
                      </svg>
                    )}
                    {category === 'testing' && (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                    )}
                  </div>
                  <h4 className={styles.categoryTitle}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h4>
                </div>
                
                <div className={styles.categorySkills}>
                  {categorySkills.map((skill) => (
                    <span key={skill.name} className={styles.categorySkillTag}>
                      <span className={styles.tagDot}></span>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 