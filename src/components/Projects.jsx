/**
 * Projects.js — Portfolio showcase
 * - Filterable project cards by category
 * - Cards with hover overlay (description + links)
 * - Live demo + GitHub links
 * - Staggered entry animations
 */
import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiBriefcase } from 'react-icons/fi';
import Magnetic from './Magnetic';
import styles from '../styles/Projects.module.css';

import ProjectCard from './ProjectCard';
import { projectsData } from '../data/portfolioData';

const filters = ['All', 'Full Stack Applications', 'Frontend Projects', 'Games', 'Clones', 'Figma'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className={`section ${styles.projects}`} id="projects">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label"><FiBriefcase /> Portfolio</p>
          <h2 className="section-title">
            Things I've <span className="gradient-text">Built</span>
          </h2>
          <p className={styles.subtitle}>
            A selection of personal, freelance, and open-source projects I'm proud of.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {filters.map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${activeFilter === f ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div className={styles.grid}>
          <AnimatePresence mode="wait">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className={styles.githubCta}
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <p className={styles.ctaText}>More projects on GitHub →</p>
          <a
            href="https://github.com/Sarthak-Khalasi-dev"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            <FiGithub /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  );
}
