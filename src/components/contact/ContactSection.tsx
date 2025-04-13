'use client';

import React, { useState } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
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
                I&apos;m open to job opportunities where I can contribute, learn and grow.
                If you have a good opportunity that matches my skills, don&apos;t hesitate to contact me.
              </p>
              
              <div className={styles.contactItems}>
                <motion.div variants={fadeInVariants} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <FiMail />
                  </div>
                  <div className={styles.contactItemContent}>
                    <p className={styles.label}>Email</p>
                    <p className={styles.value}>anupamshandilya28@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInVariants} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <FiPhone />
                  </div>
                  <div className={styles.contactItemContent}>
                    <p className={styles.label}>Phone</p>
                    <p className={styles.value}>+91 9780781386</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeInVariants} className={styles.contactItem}>
                  <div className={styles.contactItemIcon}>
                    <FiMapPin />
                  </div>
                  <div className={styles.contactItemContent}>
                    <p className={styles.label}>Location</p>
                    <p className={styles.value}>Pune, India</p>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div>
              <h4 className={styles.socialHeading}>Connect With Me</h4>
              <div className={styles.socialLinks}>
                <a href="https://www.linkedin.com/in/anupam" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FiLinkedin />
                </a>
                <a href="https://leetcode.com/user4879UP/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
                  </svg>
                </a>
                <a href="https://github.com/anupamshandilya" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <FiGithub />
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
                    placeholder="I&apos;d like to discuss a project, opportunity, or just say hi!"
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
