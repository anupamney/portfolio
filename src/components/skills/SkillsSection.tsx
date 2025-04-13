'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUpVariant, rotateScaleVariant, staggerContainerVariant } from '@/lib/animations/motion-variants';
import gsap from 'gsap';

// Skills data with icons
const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: '💻', level: 90 },
      { name: 'Next.js', icon: '⚡', level: 85 },
      { name: 'TypeScript', icon: '📘', level: 80 },
      { name: 'HTML/CSS', icon: '🎨', level: 95 },
      { name: 'Tailwind CSS', icon: '🌊', level: 90 },
      { name: 'Framer Motion', icon: '🔄', level: 75 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: '🟢', level: 85 },
      { name: 'Express', icon: '🚂', level: 80 },
      { name: 'MongoDB', icon: '🍃', level: 75 },
      { name: 'PostgreSQL', icon: '🐘', level: 70 },
      { name: 'GraphQL', icon: '⚛️', level: 65 },
      { name: 'REST API', icon: '🔌', level: 90 },
    ],
  },
  {
    name: 'Tools & Other',
    skills: [
      { name: 'Git', icon: '📋', level: 90 },
      { name: 'Docker', icon: '🐳', level: 70 },
      { name: 'AWS', icon: '☁️', level: 65 },
      { name: 'CI/CD', icon: '🔄', level: 75 },
      { name: 'Jest', icon: '🃏', level: 80 },
      { name: 'Figma', icon: '🎭', level: 85 },
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const progressBarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && progressBarsRef.current && typeof window !== 'undefined') {
      const progressBars = progressBarsRef.current.querySelectorAll('.progress-bar');
      
      gsap.fromTo(
        progressBars,
        { width: 0 },
        {
          width: (index, element) => {
            const percentage = element.getAttribute('data-percentage');
            return percentage ? `${percentage}%` : '0%';
          },
          duration: 1.5,
          ease: 'power3.out',
          stagger: 0.1,
        }
      );
    }
  }, [isInView]);

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-foreground"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            My <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          />
          <motion.p
            className="mt-6 text-foreground/70 max-w-2xl mx-auto"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            A showcase of my technical skills and expertise in various technologies and tools.
          </motion.p>
        </div>

        <div ref={progressBarsRef}>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="mb-12"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerContainerVariant}
            >
              <motion.h3 
                className="text-xl font-bold text-foreground mb-6"
                variants={fadeUpVariant}
              >
                {category.name}
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-300"
                    variants={fadeUpVariant}
                  >
                    <div className="flex items-center mb-3">
                      <motion.span 
                        className="text-2xl mr-3"
                        variants={rotateScaleVariant}
                      >
                        {skill.icon}
                      </motion.span>
                      <h4 className="font-medium text-foreground">{skill.name}</h4>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="progress-bar h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        data-percentage={skill.level}
                      ></div>
                    </div>
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-foreground/60">{skill.level}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Skill cloud animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainerVariant}
        >
          {['JavaScript', 'React', 'Node.js', 'TypeScript', 'Next.js', 'GraphQL', 'Tailwind CSS', 'MongoDB', 'AWS', 'Docker', 'Git', 'CI/CD', 'REST API', 'PostgreSQL', 'Figma', 'Jest'].map((tech, index) => (
            <motion.span
              key={index}
              className="px-4 py-2 bg-card rounded-full border border-border text-sm font-medium text-foreground/80 hover:text-primary hover:border-primary hover:bg-primary/5 cursor-default transition-colors duration-300"
              variants={fadeUpVariant}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 