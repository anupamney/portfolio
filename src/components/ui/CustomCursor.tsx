'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleLinkHoverStart = () => {
      setIsHovering(true);
    };

    const handleLinkHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Add hover effect to all links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleLinkHoverStart);
      el.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);

      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleLinkHoverStart);
        el.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, [isVisible]);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999]"
        style={{
          x: position.x - 8,
          y: position.y - 8,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
      />

      {/* Outline cursor */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-10 h-10 border-2 border-primary rounded-full pointer-events-none z-[9998]"
        style={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 25,
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
} 