import React from 'react';
import { motion } from 'framer-motion';
import { FiLayout, FiServer, FiSettings } from 'react-icons/fi';
import styles from '../styles/Capabilities.module.css';

const capabilities = [
  {
    title: 'Frontend Development',
    icon: <FiLayout />,
    description: 'Creating responsive, high-performance user interfaces using React.js and modern CSS frameworks like Tailwind.',
    tags: ['React', 'Framer Motion', 'Responsive Design']
  },
  {
    title: 'Backend Solutions',
    icon: <FiServer />,
    description: 'Building robust server-side logic and RESTful APIs with Node.js, Express, and secure database management.',
    tags: ['Node.js', 'MongoDB', 'REST APIs']
  },
  {
    title: 'Modern UI/UX',
    icon: <FiSettings />,
    description: 'Implementing intuitive user experiences with a focus on smooth interactions, accessibility, and professional design.',
    tags: ['Interactive Design', 'Visual Polish', 'User Centric']
  }
];

export default function Capabilities() {
  return (
    <div className={`section ${styles.capabilities}`} id="capabilities">
      <div className="container">
        <p className="section-label">Expertise</p>
        <h2 className="section-title">What I <span className="gradient-text">Can Do</span></h2>
        
        <div className={styles.grid}>
          {capabilities.map((cap, i) => (
            <motion.div 
              key={cap.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className={styles.iconBox}>{cap.icon}</div>
              <h3 className={styles.title}>{cap.title}</h3>
              <p className={styles.desc}>{cap.description}</p>
              <div className={styles.tags}>
                {cap.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
