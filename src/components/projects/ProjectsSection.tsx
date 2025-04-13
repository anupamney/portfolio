'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animations/motion-variants';
import styles from './ProjectsSection.module.scss';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product management, cart, and checkout functionality.',
    image: '/globe.svg',
    demoUrl: '#',
    codeUrl: '#',
    tags: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website with animations and 3D elements.',
    image: '/next.svg',
    demoUrl: '#',
    codeUrl: '#',
    tags: ['Next.js', 'Three.js', 'TailwindCSS', 'GSAP']
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    image: '/file.svg',
    demoUrl: '#',
    codeUrl: '#',
    tags: ['Vue.js', 'Firebase', 'Vuex', 'Tailwind']
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'A weather dashboard with location search, forecasts, and interactive maps.',
    image: '/vercel.svg',
    demoUrl: '#',
    codeUrl: '#',
    tags: ['React', 'OpenWeather API', 'Redux', 'Chart.js']
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.headerContainer}>
          <motion.div
            className={styles.featuredWorkLabel}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            Featured Work
          </motion.div>
          <motion.h2 
            className={styles.title}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            My <span className={styles.highlight}>Projects</span>
          </motion.h2>
          <motion.p
            className={styles.description}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            Here are some of my recent projects. Each project is unique and solves a specific problem.
          </motion.p>
        </div>
        
        <motion.div
          className={styles.projectsGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariant}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              variants={fadeUpVariant}
            >
              <div className="relative">
                <div className={styles.imageContainer}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={styles.projectImage}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div className={styles.contentContainer}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.tagsContainer}>
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={styles.tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className={styles.buttonsContainer}>
                    <a
                      href={project.demoUrl}
                      className={styles.buttonPrimary}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                    <a
                      href={project.codeUrl}
                      className={styles.buttonSecondary}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className={styles.githubLinkContainer}>
          <a
            href="#"
            className={styles.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View All Projects on GitHub</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 7l10 10M7 17V7h10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 