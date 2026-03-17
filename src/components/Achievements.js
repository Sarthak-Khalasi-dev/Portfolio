import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiAward, FiStar, FiTriangle } from 'react-icons/fi';
import styles from '../styles/Achievements.module.css';

const achievements = [
  {
    title: 'Self-Taught Web Developer',
    platform: 'MERN Stack Journey',
    icon: <FiStar />,
    description: 'Developed proficiency in React.js, Node.js, and MongoDB through dedicated self-learning and building projects.'
  },
  {
    title: 'Programming Foundations',
    platform: 'C / C++ Mastery',
    icon: <FiTriangle />,
    description: 'Built a strong logic-building base by mastering core programming concepts in C and C++.'
  },
  {
    title: 'Open Source Explorer',
    platform: 'GitHub Contributions',
    icon: <FiAward />,
    description: 'Active explorer of the open-source ecosystem, focusing on modern web technologies.'
  }
];

function AchievementCard({ ach, index }) {
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
      <div className={styles.icon}>{ach.icon}</div>
      <h3 className={styles.title}>{ach.title}</h3>
      <p className={styles.platform}>{ach.platform}</p>
      <p className={styles.desc}>{ach.description}</p>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <div className={`section ${styles.achievements}`} id="achievements">
      <div className="container">
        <p className="section-label">Accolades</p>
        <h2 className="section-title">My <span className="gradient-text">Achievements</span></h2>
        
        <div className={styles.grid}>
          {achievements.map((ach, i) => (
            <AchievementCard key={i} ach={ach} index={i} />
          ))}
        </div>

        {/* GitHub Stats Placeholder */}
        <div className={styles.githubStats}>
           <h3 className={styles.ghTitle}>GitHub Contributions</h3>
           <div className={styles.ghPlaceholder}>
              <img 
                 src="https://ghchart.rshah.org/Sarthak-Khalasi-dev" 
                 alt="Sarthak's GitHub Contributions" 
                 className={styles.ghChart}
              />
           </div>
        </div>
      </div>
    </div>
  );
}
