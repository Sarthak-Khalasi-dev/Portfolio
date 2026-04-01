import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/PreLoader.module.css';

export default function PreLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small delay after hitting 100
          return 100;
        }
        return prev + 1;
      });
    }, 15); // Adjust speed for loading feel

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      className={styles.preloader}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className={styles.container}>
        <motion.div 
          className={styles.textWrap}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.brand}>Sarthak <span className={styles.accent}>Khalasi</span></h1>
          <p className={styles.tagline}>First-Year Computer Science Student</p>
        </motion.div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBarTrack}>
            <motion.div 
              className={styles.progressBarFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.percentage}>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
