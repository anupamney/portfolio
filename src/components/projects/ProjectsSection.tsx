'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUpVariant, staggerContainerVariant } from '@/lib/animations/motion-variants';
import styles from './ProjectsSection.module.scss';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const projects = [
  {
    id: 1,
    title: 'Analytics Dashboard',
    description: 'A comprehensive business analytics dashboard with advanced filtering and template management for visualizing business performance metrics.',
    image: 'https://lottie.host/700d2795-3317-4b33-b5ad-519cc25e7403/Yq29Oybc9P.lottie',
    demoUrl: 'https://support.mindbodyonline.com/s/article/Analytics-2-0?language=en_US',
    codeUrl: '#',
    tags: ['React', 'Next.js', 'TypeScript', 'C#', '.NET Core', 'Sigma']
  },
  {
    id: 2,
    title: 'FastContext',
    description: 'A high-performance React context implementation that reduces re-renders by 40% through optimized state management and selective updates.',
    image: 'https://lottie.host/fe193d56-5f07-462f-94e7-a05fbaf39b0c/ZS9zRbVvCA.lottie',
    demoUrl: 'https://www.npmjs.com/package/selective-fast-context',
    codeUrl: 'https://github.com/anupamney/fast-context',
    tags: ['React', 'TypeScript', 'Context API', 'Performance']
  },
  {
    id: 3,
    title: "EduSat Test Series",
    description: "A solution for an exam practice paper distribution system that enables schools to effortlessly place\r orders, manage, and track practice paper set orders",
    image: "https://lottie.host/ed07f13e-6c50-4d64-98e6-82e243045d74/5yeVw6LUgb.lottie",
    demoUrl: 'https://edu-sat-test-series-ui-17rw.vercel.app/login',
    codeUrl: "https://github.com/anupamney/EduSat.TestSeries.UI",
    tags: ["React", "TypeScript", "Material UI", "Vite", "Axios", "React Router"]
  },
  {
    "id": 4,
    "title": "Quknote",
    "description": "A modern note-taking application with tagging, search functionality, and AI-powered tag suggestions using Google's Gemini API.",
    "image": "https://lottie.host/070e423b-229a-41f7-a68c-22295d498bdd/U59tXUtVNs.lottie",
    "demoUrl": "https://quknote-6br7.vercel.app/",
    "codeUrl": "https://github.com/anupamney/quknote",
    "tags": ["React", "TypeScript", "ASP.NET Core", "Google Gemini API", "Material UI"]
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
                    <DotLottieReact
      src={project.image}
      loop
      autoplay
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
            href="https://github.com/anupamney"
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