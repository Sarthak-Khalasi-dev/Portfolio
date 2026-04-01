/**
 * Skills.js — Technology / skills showcase
 * - Groups skills by category (Frontend, Backend, Tools, etc.)
 * - Animated cards with colored icons
 * - Animated proficiency bars
 * - Scroll-triggered entry animations via framer-motion
 */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiReact, SiJavascript, SiTailwindcss, SiHtml5,
  SiNodedotjs,
  SiMongodb,
  SiGit, SiFigma, SiGithub,
} from 'react-icons/si';
import { FiCode } from 'react-icons/fi';
import TiltCard from './TiltCard';
import styles from '../styles/Skills.module.css';

const skillCategories = [
  {
    category: 'Frontend',
    color: '#61dafb',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61dafb' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
      { name: 'Next.js', icon: <FiCode />, color: '#ffffff' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4' },
      { name: 'HTML/CSS', icon: <SiHtml5 />, color: '#e34f26' },
    ],
  },
  {
    category: 'Backend',
    color: '#68d391',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#68a063' },
    ],
  },
  {
    category: 'Databases',
    color: '#f6ad55',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
    ],
  },
  {
    category: 'Tools & DevOps',
    color: '#b794f4',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#f05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#ffffff' },
    ],
  },
];

/* Animated card entry */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.8, 0.25, 1] },
  }),
};

function CategoryBlock({ category, color, skills, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <TiltCard intensity={8}>
      <motion.div
        ref={ref}
        className={styles.categoryBlock}
        style={{ '--cat-color': color }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.8, 0.25, 1] }}
      >
        <h3 className={styles.catTitle}>
          <span className={styles.catDot} /> {category}
        </h3>
        <div className={styles.skillGrid}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={styles.skillBox}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className={styles.skillIcon} style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <span className={styles.skillName}>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </TiltCard>
  );
}

export default function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  return (
    <div className={`section ${styles.skills}`}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className={styles.subtitle}>
            A curated selection of technologies and tools I use to bring digital ideas to life.
          </p>
        </motion.div>

        {/* Grid of category blocks */}
        <div className={styles.grid}>
          {skillCategories.map((cat, i) => (
            <CategoryBlock key={cat.category} {...cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
