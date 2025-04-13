'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { slideInLeftVariant, slideInRightVariant, fadeUpVariant } from '@/lib/animations/motion-variants';
import { scrollTriggerAnimation } from '@/lib/animations/gsap-animations';

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
    <section id="about" className="py-24 relative overflow-hidden" style={{ backgroundColor: '#0a0a0a', color: '#ededed' }}>
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 rounded-full filter blur-3xl" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }} />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 rounded-full filter blur-3xl" style={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-[#ededed]"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          >
            About <span className="text-[#3b82f6]">Me</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-[#3b82f6] mx-auto mt-4 rounded-full"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUpVariant}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image with animation */}
          <motion.div
            className="relative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInLeftVariant}
          >
            <div className="relative w-full h-[350px] rounded-xl overflow-hidden shadow-xl flex items-center justify-center">
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: '#111827', padding: '2rem' }}
              >
                <img
                  src="/globe.svg"
                  alt="Developer Profile"
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '250px' }}
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
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-2 border-primary/30 rounded-lg" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-accent/30 rounded-lg" />
          </motion.div>
          
          {/* Content */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={slideInRightVariant}
          >
            <h3 className="text-2xl font-semibold text-[#ededed]">
              A passionate Full-Stack Developer based in <span className="text-[#3b82f6]">Your Location</span>
            </h3>
            
            <p className="text-[#ededed]/80">
              I design and develop services for customers of all sizes, specializing in creating
              stylish, modern websites, web services and online stores. My passion is to design
              digital user experiences through meaningful interactions. Check out my portfolio
              and see how I can help you.
            </p>
            
            <p className="text-[#ededed]/80">
              I&apos;ve always been fascinated with the intersection of design and technology.
              My approach combines clean, efficient code with thoughtful UI/UX design to create
              solutions that are both functional and beautiful.
            </p>
            
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block bg-[#3b82f6] text-white font-medium rounded-lg px-6 py-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Stats */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          ref={statsRef}
        >
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className="stat-item bg-[#111827] rounded-lg p-6 text-center shadow-md border border-[#374151] transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] hover:border-[#3b82f6]/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#3b82f6] mb-2">{stat.value}</div>
              <div className="text-sm text-[#ededed]/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 