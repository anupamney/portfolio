'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slideInRightVariant } from '@/lib/animations/motion-variants';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add smooth scrolling to anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.pageYOffset - 100,
            behavior: 'smooth'
          });
          
          // Update URL without scrolling
          window.history.pushState(null, '', anchor.hash);
          
          // Close mobile menu if open
          setIsMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: [0.19, 1, 0.22, 1],
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.19, 1, 0.22, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[100px] ${
        isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={logoVariants}
            className="flex-shrink-0"
          >
            <Link href="#home" className="logo">
              Portfolio
              <span>.</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={item.href}
                  className="text-[#ededed]/80 hover:text-[#3B82F6] transition-colors duration-300 text-sm font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial="hidden"
            animate="visible"
            variants={slideInRightVariant}
            onClick={toggleMenu}
            className="md:hidden flex items-center p-1.5 rounded-md text-[#ededed] focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-5 h-5 relative flex flex-col justify-center items-center">
              <span
                className={`block w-4 h-0.5 bg-[#ededed] rounded-full transition-transform duration-300 ${
                  isMenuOpen ? 'absolute rotate-45' : '-translate-y-1'
                }`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-[#ededed] rounded-full transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-[#ededed] rounded-full transition-transform duration-300 ${
                  isMenuOpen ? 'absolute -rotate-45' : 'translate-y-1'
                }`}
              ></span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <motion.div
        className="md:hidden"
        initial="closed"
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={mobileMenuVariants}
      >
        <div className="px-4 pt-1 pb-4 space-y-1 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-2.5 text-[#ededed]/80 hover:text-[#3B82F6] transition-colors duration-300 text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
} 