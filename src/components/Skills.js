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
      { name: 'React', icon: <SiReact />, color: '#61dafb', level: 90 },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e', level: 92 },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06b6d4', level: 88 },
      { name: 'HTML/CSS', icon: <SiHtml5 />, color: '#e34f26', level: 95 },
    ],
  },
  {
    category: 'Backend',
    color: '#68d391',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#68a063', level: 84 },
    ],
  },
  {
    category: 'Databases',
    color: '#f6ad55',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248', level: 80 },
    ],
  },
  {
    category: 'Tools & DevOps',
    color: '#b794f4',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#f05032', level: 88 },
      { name: 'Figma', icon: <SiFigma />, color: '#f24e1e', level: 75 },
      { name: 'GitHub', icon: <SiGithub />, color: '#ffffff', level: 90 },
    ],
  },
];

/* Animates a progress bar fill */
function ProgressBar({ level, color }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div className={styles.barTrack} ref={ref}>
      <motion.div
        className={styles.barFill}
        style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
      />
    </div>
  );
}

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
        <div className={styles.skillList}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className={styles.skillItem}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className={styles.skillTop}>
                <span className={styles.skillIcon} style={{ color: skill.color }}>
                  {skill.icon}
                </span>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              <ProgressBar level={skill.level} color={skill.color} />
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
          <p className="section-label"><FiCode /> Tech Stack</p>
          <h2 className="section-title">
            Tools I <span className="gradient-text">Work With</span>
          </h2>
          <p className={styles.subtitle}>
            A selection of technologies I've worked with professionally and in personal projects.
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
