/**
 * About.js — Personal introduction section
 * - Animated profile avatar with decorative ring
 * - Short bio text with highlighted keywords
 * - Stats bar (projects, experience, technologies)
 * - Social/contact quick links
 * - Framer-motion scroll-triggered animations
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';
import styles from '../styles/About.module.css';

const stats = [
  { value: '10+', label: 'Projects Built' },
  { value: 'Open', label: 'For Internships' },
  { value: '20+', label: 'Technologies Used' },
];

function AnimatedSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.8, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>

          {/* ---- About Content ---- */}
          <div className={styles.centeredContent}>
            <AnimatedSection delay={0.1} className={styles.sectionHeader}>
              <p className="section-label">About Me</p>
              <h2 className="section-title">
                Building things for the <span className="gradient-text">web</span>
              </h2>
              <div className="divider-center" />
            </AnimatedSection>

            <div className={styles.contentRow}>
              <AnimatedSection delay={0.2} className={styles.bioColumn}>
                <p className={styles.bio}>
                  I am a passionate <strong>first-year Computer Science student</strong> who started my journey in web development by learning HTML, CSS, and JavaScript.
                </p>
                <p className={styles.bio}>
                  I have expanded my skills into the <strong>MERN stack</strong>, working with React.js, Node.js, and MongoDB to build modern web applications.
                </p>
                <p className={styles.bio}>
                  I also have a strong foundation in programming languages like <strong>C and C++</strong>, and I continuously practice problem-solving to improve my logic-building skills.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.3} className={styles.detailsColumn}>
                {/* Info grid */}
                <div className={styles.infoGrid}>
                  {[
                    { label: 'Name', value: 'Sarthak Khalasi' },
                    { label: 'Location', value: 'Gujarat, India' },
                    { label: 'Expertise', value: 'MERN Stack, DSA' },
                    { label: 'Interests', value: 'Data Science' },
                  ].map(({ label, value }) => (
                    <div key={label} className={styles.infoItem}>
                      <span className={styles.infoLabel}>{label}</span>
                      <span className={styles.infoValue}>{value}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Stats Row */}
            <AnimatedSection delay={0.4}>
              <div className={styles.summaryStats}>
                {stats.map(({ value, label }) => (
                  <div key={label} className={styles.summaryStat}>
                    <span className={styles.summaryValue}>{value}</span>
                    <span className={styles.summaryLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* GitHub Stats — Real-world proof */}
            <AnimatedSection delay={0.5}>
              <div className={styles.githubStats}>
                <p className={styles.statLabel}>GitHub Contributions</p>
                <img
                  src="https://ghchart.rshah.org/c8a96e/Sarthak-Khalasi-dev"
                  alt="Sarthak's GitHub Contributions"
                  className={styles.githubChart}
                />
              </div>
            </AnimatedSection>

            {/* Quick links */}
            <AnimatedSection delay={0.6} className={styles.actions}>
              <a
                href="/resume.pdf"
                className="btn btn-primary"
              >
                <FiDownload /> Resume
              </a>
              <div className={styles.socialRow}>
                {[
                  { icon: <FiGithub />, href: 'https://github.com/Sarthak-Khalasi-dev', label: 'GitHub' },
                  { icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/sarthak-khalasi-73500439b/', label: 'LinkedIn' },
                ].map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={styles.socialIcon}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
