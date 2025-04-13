'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUpVariant, staggerContainerVariant, cardHoverVariant } from '@/lib/animations/motion-variants';

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
    <section id="projects" className="py-24" style={{ backgroundColor: '#0a0a0a', color: '#ededed' }}>
      {/* Background elements */}
      <div className="absolute left-0 right-0 top-0 -translate-y-1/2 h-[500px] w-full blur-3xl pointer-events-none opacity-70" 
           style={{ background: 'linear-gradient(to bottom, rgba(139, 92, 246, 0.05), transparent)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-[#ededed]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            My <span className="text-[#3b82f6]">Projects</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-[#3b82f6] mx-auto mt-4 rounded-full"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          />
          <motion.p
            className="mt-6 text-[#ededed]/70 max-w-2xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            Here are some of my recent projects. Each project is unique and solves a specific problem.
          </motion.p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariant}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card bg-[#111827] rounded-xl overflow-hidden border border-[#374151] group shadow-md"
              variants={fadeUpVariant}
              initial="initial"
              whileHover="hover"
              animate="initial"
            >
              <motion.div variants={cardHoverVariant} className="h-full">
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                  <div
                    className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundColor: '#111827', padding: '1rem' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      style={{ maxHeight: '180px' }}
                      onError={(e) => {
                        // Fallback to a colored div if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite callbacks
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#ededed] mb-2">{project.title}</h3>
                  <p className="text-[#ededed]/70 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-[#3b82f6]/10 text-[#3b82f6] text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      className="bg-[#3b82f6] text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.codeUrl}
                      className="bg-[#1f2937] text-[#f3f4f6] px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUpVariant}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#3b82f6] font-medium hover:underline"
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
        </motion.div>
      </div>
    </section>
  );
} 