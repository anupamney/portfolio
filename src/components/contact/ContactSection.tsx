'use client';

import React, { useState } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './ContactSection.module.scss';

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* Background Elements */}
        <div className={styles.gradientBottom}></div>
        <div className={styles.blueGlow}></div>
        <div className={styles.purpleGlow}></div>
        
        {/* Section Header */}
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            Get in <span className={styles.highlight}>Touch</span>
          </motion.h2>
          <div className={styles.divider}></div>
          <motion.p
            className={styles.description}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            Have a question or want to work together? Feel free to reach out!
          </motion.p>
        </div>
        
        {/* Contact Grid */}
        <div className={styles.contactGrid}>
          {/* Contact Info Column */}
          <motion.div
            className={styles.contactInfo}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            <div>
              <h3 className={styles.contactInfoHeader}>Contact Information</h3>
              <p className={styles.contactInfoText}>
                I&apos;m open to job opportunities, collaboration, and discussing new ideas.
                Feel free to reach out through any of the following ways.
              </p>
              
              <div className={styles.contactItems}>
                <motion.div variants={fadeInVariants} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <FiMail />
                  </div>
                  <div className={styles.contactItemContent}>
                    <p className={styles.label}>Email</p>
                    <p className={styles.value}>contact@example.com</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInVariants} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <FiPhone />
                  </div>
                  <div className={styles.contactItemContent}>
                    <p className={styles.label}>Phone</p>
                    <p className={styles.value}>+1 (555) 123-4567</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInVariants} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <FiMapPin />
                  </div>
                  <div className={styles.contactItemContent}>
                    <p className={styles.label}>Location</p>
                    <p className={styles.value}>New York, USA</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div>
              <h4 className={styles.socialHeading}>Connect With Me</h4>
              <div className={styles.socialLinks}>
                <a href="#github" className={styles.socialLink}>
                  <FiGithub />
                </a>
                <a href="#linkedin" className={styles.socialLink}>
                  <FiLinkedin />
                </a>
                <a href="#twitter" className={styles.socialLink}>
                  <FiTwitter />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <div className={styles.formContainer}>
              <h3 className={styles.formHeading}>Send a Message</h3>
              
              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  Your message has been sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  Something went wrong. Please try again later.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.name ? styles.hasError : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className={styles.formError}>{errors.name}</p>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`${styles.formInput} ${errors.email ? styles.hasError : ''}`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className={styles.formError}>{errors.email}</p>}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${styles.formTextarea} ${errors.message ? styles.hasError : ''}`}
                    placeholder="I'd like to discuss a project..."
                  ></textarea>
                  {errors.message && <p className={styles.formError}>{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg 
                        className={styles.spinnerIcon}
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 