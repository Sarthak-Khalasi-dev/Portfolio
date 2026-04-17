import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiExternalLink, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { certificatesData } from '../data/portfolioData';
import styles from '../styles/Certificates.module.css';

export default function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive spread configuration
  const [spread, setSpread] = useState(220);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setSpread(0); // Stack fully on top with vertical offset
      } else if (window.innerWidth < 800) {
        setSpread(120); // Compact horizontal spread
      } else {
        setSpread(220); // Full horizontal spread
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % certificatesData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);
  };

  return (
    <div className={`section ${styles.certificates}`} id="certificates">
      <div className="container">
        <div className={styles.headerArea}>
          <div>
            <p className="section-label">Credentials</p>
            <h2 className="section-title">My <span className="gradient-text">Certifications</span></h2>
          </div>
        </div>
        
        <div className={styles.stackContainer}>
          <AnimatePresence>
            {certificatesData.map((cert, index) => {
              // Calculate relative position based on activeIndex for horizontal coverflow
              const total = certificatesData.length;
              let relativeIndex = index - activeIndex;
              
              // Normalize to [-floor(Total/2), floor(Total/2)]
              if (relativeIndex > Math.floor(total / 2)) {
                relativeIndex -= total;
              } else if (relativeIndex < -Math.ceil(total / 2) + 1) {
                relativeIndex += total;
              }

              // Show only direct neighbors or up to 2 items away if you have more items
              if (Math.abs(relativeIndex) > 2) return null;

              const isTop = relativeIndex === 0;
              const absOffset = Math.abs(relativeIndex);

              return (
                <motion.div
                  key={cert.id}
                  className={`${styles.card} ${isTop ? styles.cardActive : ''}`}
                  initial={{ 
                    scale: 0.8, 
                    x: 0,
                    opacity: 0,
                    zIndex: -1
                  }}
                  animate={{ 
                    scale: 1 - absOffset * 0.15,
                    x: relativeIndex * spread, 
                    y: spread === 0 ? (relativeIndex > 0 ? absOffset * 25 : -(absOffset * 25)) : 0,
                    zIndex: total - absOffset,
                    opacity: 1 - absOffset * (spread === 0 ? 0.3 : 0.2)
                  }}
                  transition={{ 
                    duration: 0.5, 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 20 
                  }}
                  style={{
                    pointerEvents: isTop ? 'auto' : 'none'
                  }}
                >
                  {/* Top: Certificate Image Preview */}
                  <a href={cert.link} target="_blank" rel="noreferrer" className={styles.imageWrapper}>
                    <img 
                      src={cert.image} 
                      alt={`${cert.title} Certificate`} 
                      className={styles.certImage} 
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.overlayText}>
                        <FiEye /> View Full Certificate
                      </span>
                    </div>
                  </a>

                  {/* Middle & Bottom: Content */}
                  <div className={styles.content}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.title}>{cert.title}</h3>
                      {cert.verified && (
                        <span className={styles.verifiedBadge}>
                          <FiCheckCircle /> Verified
                        </span>
                      )}
                    </div>
                    
                    <div className={styles.issuerRow}>
                      <span className={styles.issuer}>{cert.issuer}</span>
                      {cert.date && <span className={styles.date}>{cert.date}</span>}
                    </div>
                    
                    <p className={styles.desc}>{cert.description}</p>
                    
                    <a href={cert.link} target="_blank" rel="noreferrer" className={styles.actionBtn}>
                       View Credentials <FiExternalLink />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {certificatesData.length > 1 && (
          <div className={styles.controls}>
            <button onClick={handlePrev} className={styles.iconButton} aria-label="Previous Certificate">
              <FiChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className={styles.iconButton} aria-label="Next Certificate">
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
