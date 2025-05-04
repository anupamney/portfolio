import React, { useState } from 'react';
import styles from './RequestCodeAccessDialog.module.scss';

interface RequestCodeAccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export default function RequestCodeAccessDialog({ isOpen, onClose, projectTitle }: RequestCodeAccessDialogProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Replace with your actual form submission logic (e.g., API call)
    console.log('Submitting request for:', projectTitle);
    console.log('Email:', email);
    console.log('Message:', message);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example success/error handling
    const success = Math.random() > 0.2; // Simulate success/failure
    if (success) {
      setSubmitStatus('success');
      setEmail('');
      setMessage('');
      // Optionally close the dialog after a delay
      // setTimeout(onClose, 2000);
    } else {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <h2 className={styles.dialogTitle}>Request Access for {projectTitle}</h2>
        <p className={styles.dialogDescription}>Please provide your email address and a brief message explaining your interest in the code.</p>

        {submitStatus === 'success' ? (
          <div className={styles.successMessage}>
            Your request has been submitted successfully! I&apos;ll get back to you soon.
          </div>
        ) : submitStatus === 'error' ? (
          <div className={styles.errorMessage}>
            Something went wrong. Please try again later.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email Address:</label>
              <input
                type="email"
                id="email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Message (Optional):</label>
              <textarea
                id="message"
                className={styles.formTextarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                disabled={isSubmitting}
              />
            </div>
            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
