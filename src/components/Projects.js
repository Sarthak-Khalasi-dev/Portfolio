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
import TiltCard from './TiltCard';
import styles from '../styles/Projects.module.css';

const filters = ['All', 'Frontend', 'Backend', 'API-based Project'];

const projects = [
  {
    id: 1,
    title: 'Tissot Clone',
    description: 'A meticulously crafted clone of the Tissot watch website, featuring a responsive design and smooth user interface. It highlights premium watch collections with stunning visuals and interactive elements.',
    tags: ['React', 'CSS', 'Frontend'],
    category: 'Frontend',
    github: 'https://github.com/Sarthak-Khalasi-dev/tissot',
    live: 'https://tissotc.netlify.app',
    image: '/assets/tissot-clone.png',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accentColor: '#61dafb',
    featured: true,
  },
  {
    id: 2,
    title: 'Stripe Clone',
    description: 'A pixel-perfect replica of the Stripe payment platform homepage. It showcases advanced CSS techniques, intricate animations, and a modern, clean aesthetic tailored for fintech web design.',
    tags: ['React', 'CSS Animations', 'UI/UX'],
    category: 'Frontend',
    github: 'https://github.com/Sarthak-Khalasi-dev/stripe-clone',
    live: 'https://stripe-clown.netlify.app',
    image: '/assets/stripe-clone.png',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    accentColor: '#c8a96e',
    featured: true,
  },
  {
    id: 3,
    title: 'HubSpot Academy Clone',
    description: 'A comprehensive frontend clone of HubSpot Academy\'s educational portal. It features structured layouts, course catalog displays, and a user-friendly interface designed for an engaging learning experience.',
    tags: ['React', 'Frontend Design', 'Education'],
    category: 'Frontend',
    github: 'https://github.com/Sarthak-Khalasi-dev/Hubspot-academy',
    live: 'https://hubspot-clown.netlify.app/',
    image: '/assets/hubspot-clone.png',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d1b4e 50%, #4a0080 100%)',
    accentColor: '#b794f4',
    featured: false,
  },
  {
    id: 4,
    title: 'Meal Explorer',
    description: 'An interactive web application that fetches dynamic culinary data from an external API. Users can search for various meals, view detailed recipes, and explore a rich database of global cuisines.',
    tags: ['React', 'REST API', 'JavaScript'],
    category: 'API-based Project',
    github: 'https://github.com/Sarthak-Khalasi-dev/Meal-Explorer',
    live: 'https://mealexplorervlone.netlify.app',
    image: '/assets/meal-explorer.png',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a2e1a 50%, #0a2d0a 100%)',
    accentColor: '#68d391',
    featured: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.8, 0.25, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <TiltCard intensity={12}>
      <motion.div
        className={`${styles.card} ${project.featured ? styles.featured : ''}`}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{ '--accent': project.accentColor }}
      >
        {/* Visual preview area */}
        <div className={styles.cardVisual} style={{ background: project.gradient }}>
          {project.image && (
             <img 
               src={project.image} 
               alt={project.title} 
               style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, opacity: 0.8 }} 
             />
          )}
          {/* Grid decoration */}
          <div className={styles.cardGrid} />
          {/* Project title overlay */}
          <div className={styles.cardLetters}>
            {project.title.slice(0, 2).toUpperCase()}
          </div>
          {/* Hover overlay with links */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className={styles.overlayLinks}>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                  <FiExternalLink /> Live Demo
                </a>
              )}
              <a href={project.github} target="_blank" rel="noreferrer" className={styles.overlayLink}>
                <FiGithub /> GitHub
              </a>
            </div>
          </motion.div>
          {/* Featured badge */}
          {project.featured && (
            <span className={styles.featuredBadge}>⭐ Featured</span>
          )}
        </div>

        {/* Card body */}
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardDesc}>{project.description}</p>
          <div className={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.cardLinks}>
            <a href={project.github} target="_blank" rel="noreferrer" className={styles.iconLink}>
              <FiGithub /> Code
            </a>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className={styles.iconLink}>
                <FiExternalLink /> Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className={`section ${styles.projects}`}>
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
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
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
