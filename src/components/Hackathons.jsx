import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiTerminal, FiX, FiWifi, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { hackathonsData } from '../data/portfolioData';
import styles from '../styles/Hackathons.module.css';

/* ─────────────────── Marquee strip inside modal ─────────────────── */
function ImageMarquee({ images }) {
  const doubled = [...images, ...images, ...images];
  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.marqueeTrack}>
        {doubled.map((src, i) => (
          <div key={i} className={styles.marqueeItem}>
            <img src={src} alt={`hackathon-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── Modal ─────────────────── */
function HackathonModal({ hack, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const images = hack.images && hack.images.length > 0 ? hack.images : [hack.image];

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <FiX size={20} />
          </button>

          <div className={styles.modalImageSection}>
            <ImageMarquee images={images} />
            <div className={styles.modalImageFade} />
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalLeft}>
              <span className={styles.modalLevel}>{hack.level}</span>
              <h2 className={styles.modalTitle}>{hack.title}</h2>
              {hack.badge && <span className={styles.modalBadge}>{hack.badge}</span>}
              {hack.github && (
                <a href={hack.github} target="_blank" rel="noreferrer" className={styles.modalGithub}>
                  <FiGithub /> View Code
                </a>
              )}
            </div>

            <div className={styles.modalRight}>
              <div className={styles.modalSection}>
                <span className={styles.modalSectionLabel}>Problem Statement</span>
                <p className={styles.modalText}>{hack.problem}</p>
              </div>
              <div className={styles.modalDivider} />
              <div className={styles.modalSection}>
                <span className={styles.modalSectionLabel}>Our Solution</span>
                <p className={styles.modalText}>{hack.solution}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────── Main Component ─────────────────── */
export default function Hackathons() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedHack, setSelectedHack] = useState(null);
  
  // Responsive spread configuration
  const [spread, setSpread] = useState(220);
  useEffect(() => {
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

  const filtered = activeTab === 'all'
    ? hackathonsData
    : hackathonsData.filter((h) => h.type === activeTab);

  // Reset index when tab changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const handleCardClick = (hack) => setSelectedHack(hack);

  return (
    <div className={`section ${styles.hackathons}`} id="hackathons">
      <div className="container">

        {/* ── Header ── */}
        <div className={styles.headerArea}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label"><FiTerminal /> Competitions</p>
            <h2 className="section-title">Hackathon <span className="gradient-text">Experience</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1.05rem', maxWidth: '500px' }}>
              Real-world challenges solved through rapid prototyping and collaboration.
            </p>
          </motion.div>
        </div>

        {/* ── Tab Navigation ── */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {[
            { key: 'all', label: 'All', icon: <FiTerminal size={14} /> },
            { key: 'online', label: 'Online', icon: <FiWifi size={14} /> },
            { key: 'offline', label: 'Offline', icon: <FiMapPin size={14} /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              className={`${styles.tab} ${activeTab === key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {icon} {label}
              {activeTab === key && (
                <motion.span className={styles.tabUnderline} layoutId="hack-tab-underline" />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Stack Container ── */}
        <div className={styles.stackContainer}>
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.emptyMsg}
              >
                No hackathons in this category yet.
              </motion.p>
            ) : (
                filtered.map((hack, index) => {
                  const total = filtered.length;
                  let relativeIndex = index - activeIndex;
                  
                  if (relativeIndex > Math.floor(total / 2)) {
                    relativeIndex -= total;
                  } else if (relativeIndex < -Math.ceil(total / 2) + 1) {
                    relativeIndex += total;
                  }

                  if (Math.abs(relativeIndex) > 2) return null;

                  const isTop = relativeIndex === 0;
                  const absOffset = Math.abs(relativeIndex);

                  return (
                    <motion.div
                      key={hack.id}
                      className={`${styles.card} ${isTop ? styles.cardActive : ''}`}
                      initial={{ scale: 0.8, x: 0, opacity: 0, zIndex: -1 }}
                      animate={{ 
                        scale: 1 - absOffset * 0.15,
                        x: relativeIndex * spread, 
                        y: spread === 0 ? (relativeIndex > 0 ? absOffset * 25 : -(absOffset * 25)) : 0,
                        zIndex: total - absOffset,
                        opacity: 1 - absOffset * (spread === 0 ? 0.3 : 0.2)
                      }}
                      transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
                      style={{ pointerEvents: isTop ? 'auto' : 'none' }}
                    >
                      <div className={styles.imageWrapper}>
                        <img src={hack.image} alt={hack.title} className={styles.cardImage} />
                        {hack.badge && <span className={styles.badge}>{hack.badge}</span>}
                        <span className={styles.typeChip}>
                          {hack.type === 'online' ? <FiWifi size={11} /> : <FiMapPin size={11} />}
                          {hack.type}
                        </span>
                      </div>

                      <div className={styles.content}>
                        <div className={styles.header}>
                          <span className={styles.level}>{hack.level}</span>
                          <h3 className={styles.title}>{hack.title}</h3>
                        </div>

                        <div className={styles.actions}>
                          {hack.github && (
                            <a href={hack.github} target="_blank" rel="noreferrer" className={`${styles.btn} ${styles.btnPrimary}`}>
                              <FiGithub /> Code
                            </a>
                          )}
                          <button onClick={() => handleCardClick(hack)} className={`${styles.btn} ${styles.btnOutline}`}>
                            <FiExternalLink /> Project Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
            )}
          </AnimatePresence>
        </div>

        {/* ── Controls ── */}
        {filtered.length > 1 && (
          <div className={styles.controls}>
            <button onClick={handlePrev} className={styles.iconButton} aria-label="Previous Hackathon">
              <FiChevronLeft size={24} />
            </button>
            <button onClick={handleNext} className={styles.iconButton} aria-label="Next Hackathon">
              <FiChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {selectedHack && (
        <HackathonModal hack={selectedHack} onClose={() => setSelectedHack(null)} />
      )}
    </div>
  );
}
