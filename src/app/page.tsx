'use client';

import dynamic from 'next/dynamic';

// Import sections with correct SSR settings
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'), { ssr: false });
const AboutSection = dynamic(() => import('@/components/about/AboutSection'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/projects/ProjectsSection'), { ssr: true });
const SkillsSection = dynamic(() => import('@/components/skills/SkillsSection'), { ssr: true });
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'), { ssr: true });

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
