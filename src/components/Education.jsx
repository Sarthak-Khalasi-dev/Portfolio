import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBookOpen, FiCalendar } from 'react-icons/fi';
import styles from '../styles/Education.module.css';

const educationData = [
  {
    degree: 'Bachelor of Technology (B.Tech) in Computer Science',
    institution: 'Swaminarayan University',
    period: '2025 - 2029 (Expected)',
    details: [
      'Currently in First Year (Semester 1 & 2)',
      'Subjects: C Programming, Mathematics for CS, Basic Electronics, Communication Skills',
      'Focus: Strengthening foundations in Logic Building & Professional Communication'
    ]
  },
  {
    degree: 'Higher Secondary (CBSE Board)',
    institution: 'Lancers Army School (CBSE)',
    period: 'Completed in 2025',
    details: [
      'Focus: Science & Mathematics'
    ]
  }
];

function EducationItem({ edu, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={styles.item}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h3 className={styles.degree}>{edu.degree}</h3>
          <h4 className={styles.institution}><FiBookOpen /> {edu.institution}</h4>
        </div>
        <span className={styles.period}><FiCalendar /> {edu.period}</span>
      </div>
      <ul className={styles.details}>
        {edu.details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Education() {
  return (
    <div className={`section ${styles.education}`} id="education">
      <div className="container">
        <p className="section-label">Academic Background</p>
        <h2 className="section-title">My <span className="gradient-text">Education</span></h2>

        <div className={styles.list}>
          {educationData.map((edu, i) => (
            <EducationItem key={i} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
