'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animations/motion-variants';
import styles from './ProjectsSection.module.scss';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A comprehensive business analytics dashboard with advanced filtering and template management for visualizing business performance metrics.',
    image: '/projects/analytics-dashboard.png',
    demoUrl: 'https://www.mindbodyonline.com/business/features/analytics',
    codeUrl: '#',
    tags: ['React', 'Next.js', 'TypeScript', 'C#', 'Aurora DB']
  },
  {
    id: 2,
    title: 'FastContext',
    description: 'A high-performance React context implementation that reduces re-renders by 40% through optimized state management and selective updates.',
    image: '/projects/fast-context.png',
    demoUrl: '#',
    codeUrl: 'https://github.com/anupamshandilya92/fast-context',
    tags: ['React', 'TypeScript', 'Context API', 'Performance']
  },
  {
    id: 3,
    title: 'AI Portfolio Generator',
    description: 'A web application that generates personalized portfolio websites using AI. Users can input their information and get a custom portfolio instantly.',
    image: '/projects/portfolio-generator.png',
    demoUrl: 'https://ai-portfolio-generator.vercel.app',
    codeUrl: 'https://github.com/anupamshandilya92/ai-portfolio-generator',
    tags: ['Next.js', 'OpenAI API', 'Framer Motion', 'SCSS']
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    description: 'A full-stack real-time chat application with instant messaging, user authentication, and chat room functionality.',
    image: '/projects/chat-app.png',
    demoUrl: 'https://chat-app-demo.vercel.app',
    codeUrl: 'https://github.com/anupamshandilya92/real-time-chat',
    tags: ['React', 'Socket.io', 'Express', 'MongoDB']
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
            href="https://github.com/anupamshandilya92"
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