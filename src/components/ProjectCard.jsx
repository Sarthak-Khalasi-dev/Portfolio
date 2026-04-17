import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFigma } from 'react-icons/fi';
import Magnetic from './Magnetic';
import styles from '../styles/Projects.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.8, 0.25, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Magnetic intensity={0.1}>
      <motion.div
        className={`${styles.card} ${project.featured ? styles.featured : ''}`}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        exit="exit"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ '--accent': project.accentColor }}
      >
        {/* Visual preview area with Device Mockup & Zoom */}
        <div className={styles.cardVisual} style={{ background: project.gradient }}>
          <div className={styles.mockupContainer}>
            <div className={styles.browserFrame}>
              <div className={styles.browserDots}>
                <span /> <span /> <span />
              </div>
              <div className={styles.browserContent}>
                {project.image && (
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className={styles.projectImage}
                    animate={{ scale: hovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Hover overlay with links */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.overlayLinks}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                  <FiExternalLink /> Live Demo
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                  <FiGithub /> GitHub
                </a>
              )}
              {project.figma && (
                <a href={project.figma} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                  <FiFigma /> View on Figma
                </a>
              )}
            </div>
          </motion.div>
          
          {/* Featured badge */}
          {project.featured && (
            <span className={styles.featuredBadge}>⭐ Featured</span>
          )}
        </div>

        {/* Card body */}
        <div className={styles.cardBody}>
          <div className={styles.cardHeader}>
            <span className={styles.categoryTag}>{project.category}</span>
          </div>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          
          {/* Support for Hackathon specific fields vs Project specific fields */}
          {project.problem && <p className={styles.cardDesc}><strong>Problem:</strong> {project.problem}</p>}
          {project.solution && <p className={styles.cardDesc}><strong>Solution:</strong> {project.solution}</p>}
          
          {!project.problem && <p className={styles.cardDesc}>{project.description}</p>}
          
          {project.outcome && (
            <div className={styles.learnings}>
              <span className={styles.learningLabel}>Outcome:</span> {project.outcome}
            </div>
          )}

          {project.keyLearnings && (
            <div className={styles.learnings}>
              <span className={styles.learningLabel}>Key Learning:</span> {project.keyLearnings}
            </div>
          )}

          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Magnetic>
  );
}
