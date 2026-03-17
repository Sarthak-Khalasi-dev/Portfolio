import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import styles from '../styles/Experience.module.css';

const experiences = [
  {
    role: 'Aspiring Full Stack Developer',
    company: 'Learning & Building Journey',
    period: '2024 - Present',
    description: [
      'Learning and building projects using HTML, CSS, JavaScript, and React.js.',
      'Exploring backend development with Node.js and MongoDB.',
      'Practicing programming using C and C++.',
      'Focused on building real-world projects and improving problem-solving skills.'
    ]
  }
];

function ExperienceItem({ exp, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={styles.item}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.dot} />
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.role}>{exp.role}</h3>
          <span className={styles.period}><FiCalendar /> {exp.period}</span>
        </div>
        <h4 className={styles.company}><FiBriefcase /> {exp.company}</h4>
        <ul className={styles.desc}>
          {exp.description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <div className={`section ${styles.experience}`} id="experience">
      <div className="container">
        <p className="section-label">Professional Journey</p>
        <h2 className="section-title">Experience & <span className="gradient-text">Internships</span></h2>
        
        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
