import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


// Text animation without SplitText
export const animateText = (
  element: string | Element,
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    ease?: string;
    delay?: number;
  } = {}
) => {
  if (typeof window === 'undefined') return;

  const defaults = {
    stagger: 0.02,
    duration: 0.8,
    y: 50,
    ease: 'expo.out',
    delay: 0,
  };

  const mergedOptions = { ...defaults, ...options };
  const { stagger, duration, y, ease, delay } = mergedOptions;

  gsap.from(element, {
    opacity: 0,
    y,
    stagger,
    duration,
    ease,
    delay,
  });
};

// Scroll-triggered animation for sections
export const scrollTriggerAnimation = (
  element: string | Element,
  options: {
    y?: number;
    opacity?: number;
    stagger?: number;
    duration?: number;
    ease?: string;
    trigger?: string | Element;
    start?: string;
    markers?: boolean;
  } = {}
) => {
  if (typeof window === 'undefined') return;

  const defaults = {
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'expo.out',
    trigger: element,
    start: 'top 80%',
    markers: false,
  };

  const mergedOptions = { ...defaults, ...options };
  const { y, opacity, stagger, duration, ease, trigger, start, markers } = mergedOptions;

  return gsap.from(element, {
    y,
    opacity,
    stagger,
    duration,
    ease,
    scrollTrigger: {
      trigger,
      start,
      markers,
    },
  });
};

// Parallax effect for images or backgrounds
export const parallaxEffect = (
  element: string | Element,
  options: {
    speed?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  if (typeof window === 'undefined') return;

  const defaults = {
    speed: 0.2,
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  };

  const mergedOptions = { ...defaults, ...options };
  const { speed, trigger, start, end, scrub } = mergedOptions;

  return gsap.to(element, {
    y: () => window.innerHeight * speed * -1,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub,
    },
  });
};

// Magnetic effect for buttons or interactive elements
export const createMagneticEffect = (element: HTMLElement, strength: number = 0.3) => {
  if (typeof window === 'undefined') return;

  const bounds = element.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  const handleMouseMove = (e: MouseEvent) => {
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    gsap.to(element, {
      x: dx * strength,
      y: dy * strength,
      duration: 1,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return function to remove listeners
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Smooth scroll to element
export const smoothScrollTo = (
  target: string | HTMLElement,
  options: {
    duration?: number;
    offset?: number;
    ease?: string;
  } = {}
) => {
  if (typeof window === 'undefined') return;

  const defaults = {
    duration: 1,
    offset: 0,
    ease: 'expo.inOut',
  };

  const mergedOptions = { ...defaults, ...options };
  const { duration, offset, ease } = mergedOptions;

  const targetElement =
    typeof target === 'string' ? document.querySelector(target) : target;
  if (!targetElement) return;

  const targetPosition =
    targetElement.getBoundingClientRect().top + window.pageYOffset + offset;

  gsap.to(window, {
    duration,
    scrollTo: {
      y: targetPosition,
      autoKill: true,
    },
    ease,
  });
}; 