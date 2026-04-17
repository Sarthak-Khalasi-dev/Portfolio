import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiLayout, FiFigma, FiExternalLink } from 'react-icons/fi';
import styles from '../styles/Achievements.module.css';

const figmaDesigns = [
  {
    title: 'E-Commerce App UI',
    platform: 'Figma',
    icon: <FiFigma />,
    link: '#',
    description: 'A modern, user-centric e-commerce interface with an emphasis on seamless checkout flows and typography.'
  },
  {
    title: 'Dashboard Wireframes',
    platform: 'Figma',
    icon: <FiLayout />,
    link: '#',
    description: 'Admin dashboard design featuring data visualization, responsive layouts, and a clean dark mode theme.'
  }
];

function DesignCard({ design, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.icon}>{design.icon}</div>
      <h3 className={styles.title}>{design.title}</h3>
      <p className={styles.platform}>{design.platform}</p>
      <p className={styles.desc}>{design.description}</p>
      <a href={design.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem', display: 'inline-block' }}>
        <FiExternalLink /> View on Figma
      </a>
    </motion.div>
  );
}

export default function FigmaDesigns() {
  return (
    <div className={`section ${styles.achievements}`} id="figma-designs">
      <div className="container">
        <p className="section-label">Design</p>
        <h2 className="section-title">Figma <span className="gradient-text">Designs</span></h2>
        
        <div className={styles.grid}>
          {figmaDesigns.map((design, i) => (
            <DesignCard key={i} design={design} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
